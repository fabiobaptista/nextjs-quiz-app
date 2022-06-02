import MainContainer from '@/components/MainContainer'
import Modal from '@/components/Modal'
import { useAppContext } from '@/context/ContextProvider'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'

import styles from '@/styles/pages/questions.module.scss'
import { useEffect, useState } from 'react'
import UseCasesFactory from '@/factory/UseCasesFactory'
import { Answer, Question } from '@/domain/round'

const loadRoundUseCase = UseCasesFactory.createLoadRound()
const saveAnswerUseCase = UseCasesFactory.createSaveAnswer()

const Questions: NextPage = () => {
  const route = useRouter()
  const {updateIsBusy, ...context} = useAppContext()

  const [msg, setMsg] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])

  // Mounted
  useEffect(() => {
    (async () => {
      updateIsBusy(true)

      // ensure that round id is provided
      // TODO - candidate for hook
      const roundId = route.query.round || ''
      if(!roundId && !isNaN(+roundId)) {
        route.push('/')
      }
      const data = await loadRoundUseCase.execute({ roundId: +roundId })

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

  async function handleAnswerQuestion(questionId:number, optionId: number) {
    updateIsBusy(true)
    
    if(currentQuestion < questions.length - 1) {
      const resul = await saveAnswerUseCase.execute({
        roundId: context.roundId,
        questionId,
        optionId
      })
      
      if(resul.answer) {
        
        const answer: Answer = {
          id: resul.answer.id,
          questionId: resul.answer.question_id,
          optionId: resul.answer.option_id,
          correct: resul.answer.correct
        }
        setAnswers(a => [...a, answer])
        setCurrentQuestion(q => q + 1)
      }
    } else {
      route.push(`/${context.roundId}/result`)
    }
    updateIsBusy(false)
  }

  return (
    <MainContainer>
      <Modal className='alignItemsStretch'>
        <div className={`${styles.cardHeader}` }>
          <div>{currentQuestion+1}/{questions.length}</div>
          <div>Certas: {answers.filter(a => a.correct).length}</div>
        </div>
        <div className={styles.cardQuestion}>
          {questions[currentQuestion]?.description}
        </div>
        <div className={styles.cardAnswers}>
          {questions[currentQuestion]?.options.map(o => (
            <button key={o.id} onClick={() => handleAnswerQuestion(questions[currentQuestion]?.id, o.id) }>{o.label}</button>
          ))}
          
        </div>
      </Modal>
    </MainContainer>
  )
}

export default Questions
