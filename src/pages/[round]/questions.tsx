import MainContainer from '@/components/MainContainer'
import Modal from '@/components/Modal'
import { useAppContext } from '@/context/ContextProvider'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'

import styles from '@/styles/pages/questions.module.scss'
import { useEffect } from 'react'
import { runInContext } from 'vm'

const Questions: NextPage = () => {
  const route = useRouter()
  const context = useAppContext()

  useEffect(() => {
    // ensure that round id is provided
    const roundId = route.query.round || ''
    if(!roundId && !isNaN(+roundId)) {
      route.push('/')
    }

    
  }, [])

  return (
    <MainContainer>
      <Modal className='alignItemsStretch'>
        <div className={`${styles.cardHeader}` }>
          <div>1/3</div>
          <div>Rodada: {route.query.round}</div>
          <div>Certas: 0</div>
        </div>
        <div className={styles.cardQuestion}>
          Petinha por que você matou o Curirim?
        </div>
        <div className={styles.cardAnswers}>
          <button onClick={() => route.push('/result')}>resp 1</button>
          <button>resp 2</button>
          <button>resp 3</button>
          <button>resp 4</button>
        </div>
      </Modal>
    </MainContainer>
  )
}

export default Questions
