import MainContainer from '@/components/MainContainer'
import Modal from '@/components/Modal'
import { useAppContext } from '@/context/ContextProvider'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'

import styles from '@/styles/pages/questions.module.scss'
import { useEffect, useState } from 'react'
import UseCasesFactory from '@/factory/UseCasesFactory'
import { Question } from '@/domain/round'

const loadRoundUseCase = UseCasesFactory.createLoadRound()

const Questions: NextPage = () => {
  const route = useRouter()
  const {updateIsBusy, ...context} = useAppContext()

  const [msg, setMsg] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])

  // Mounted
  useEffect(() => {
    (async () => {
      updateIsBusy(true)

      // ensure that round id is provided
      const roundId = route.query.round || ''
      if(!roundId && !isNaN(+roundId)) {
        route.push('/')
      }
      const data = await loadRoundUseCase.execute({ roundId: +roundId })
      
      console.log(data)
      const questions: Question[] = data.round?.questions.map(q => ({
        id: q.id,
        description: q.description,
        options: q.options.map(o => ({
          id: o.id,
          label: o.label
        }))
      })) || []

      // ensure that round is received
      if(!questions.length) {
        route.push('/')
      }

      setQuestions(questions)

      updateIsBusy(false)
    })()
  }, [])

  function handleAnswerQuestion(optionId: number) {
    updateIsBusy(true)
    console.log(optionId)
    if(currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      route.push('/result')
    }
    updateIsBusy(false)
  }

  return (
    <MainContainer>
      <Modal className='alignItemsStretch'>
        <div className={`${styles.cardHeader}` }>
          <div>{currentQuestion+1}/{questions.length}</div>
          <div>Rodada: {route.query.round}</div>
          <div>Certas: 0</div>
        </div>
        <div className={styles.cardQuestion}>
          {questions[currentQuestion]?.description}
        </div>
        <div className={styles.cardAnswers}>
          {questions[currentQuestion]?.options.map(o => (
            <button key={o.id} onClick={() => handleAnswerQuestion(o.id) }>{o.label}</button>
          ))}
          
        </div>
      </Modal>
    </MainContainer>
  )
}

export default Questions
