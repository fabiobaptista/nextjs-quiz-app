import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import { useEffect, useState } from 'react'

import { useAppContext } from '@/context/ContextProvider'
import { RoundResult } from '@/domain/round'
import UseCasesFactory from '@/factory/UseCasesFactory'
import MainContainer from '@/components/MainContainer'
import Modal from '@/components/Modal'
import Chart from '@/components/Chart'
import Stars from '@/components/Stars'

import styles from '@/styles/pages/result.module.scss'

const loadRoundResultUseCase = UseCasesFactory.createLoadRoundResult()

const Result: NextPage = () => {
  const route = useRouter()
  const {updateIsBusy, ...context} = useAppContext()
  const [result, setResult] = useState<RoundResult>()

  useEffect(() => {
    (async () => {
      updateIsBusy(true)

      // ensure that round id is provided
      // TODO - candidate for hook
      const roundId = route.query.round || ''
      if(!roundId && !isNaN(+roundId)) {
        route.push('/')
      }
      const data = await loadRoundResultUseCase.execute({ roundId: +roundId })

      if(data.round) {
        const result: RoundResult = {
          id: data.round?.id,
          playerId: data.round?.player_id,
          totalAnsweredQuestions: data.round?.total_answered_questions,
          totalCorrectAnswers: data.round?.total_correct_answers,
          totalQuestions: data.round?.total_questions,
        }

        setResult(result)
      } else {
        route.push('/')
      }


      updateIsBusy(false)
    })()
  }, [])

  
  return (
    <MainContainer>
      <Modal className='alignItemsStretch'>
        <div className={`${styles.cardHeader}` }>
          Resultado
        </div>

        <div className={styles.cardResult}>
          <Chart total={result?.totalQuestions || 0} correct={result?.totalCorrectAnswers || 0}/>
          <Stars  total={result?.totalQuestions || 0} correct={result?.totalCorrectAnswers || 0}/>
        </div>

        <div className={styles.cardFooter}>
          <button onClick={() => route.push('/')}>Fim</button>
        </div>
      </Modal>
    </MainContainer>
  )
}

export default Result
