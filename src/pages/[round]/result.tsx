import MainContainer from '@/components/MainContainer'
import Modal from '@/components/Modal'
import { useAppContext } from '@/context/ContextProvider'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import Image from 'next/image'

import styles from '@/styles/pages/result.module.scss'
import { useEffect, useState } from 'react'
import { RoundResult } from '@/domain/round'
import UseCasesFactory from '@/factory/UseCasesFactory'
import Chart from '@/components/Chart'

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

  function buildStarts() {
    const starts = []
    const total = result?.totalQuestions || 0
    const correct = result?.totalCorrectAnswers || 0

    for(let i = 0; i < total; i++) {
      starts.push(
        <div key={i} className={styles.starts}>
          <Image
            src= { i >= correct ? "/images/star-empty.png" : "/images/star-filled.png" }
            width={50}
            height={50}
            alt="star"
          />
        </div>
      )
    }
    return starts
  }
  return (
    <MainContainer>
      <Modal className='alignItemsStretch'>
        <div className={`${styles.cardHeader}` }>
          Resultado
        </div>

        <div className={styles.cardResult}>
          <Chart total={result?.totalQuestions || 0} correct={result?.totalCorrectAnswers || 0}/>
          <span className="stars">
            { buildStarts() }
          </span>
        </div>

        <div className={styles.cardFooter}>
          <button onClick={() => route.push('/')}>Fim</button>
        </div>
      </Modal>
    </MainContainer>
  )
}

export default Result
