import MainContainer from '@/components/MainContainer'
import Modal from '@/components/Modal'
import { useAppContext } from '@/context/ContextProvider'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'

import styles from '@/styles/pages/questions.module.scss'

const Questions: NextPage = () => {
  const route = useRouter()
  const context = useAppContext()

  return (
    <MainContainer>
      <Modal className='alignItemsStretch'>
        <div className={`${styles.cardHeader}` }>
          <div>1/3</div>
          <div>Certas: 0</div>
        </div>
        <div className={styles.cardQuestion}>
          Petinha por que você matou o Curirim?
        </div>
        <div className={styles.cardAnswers}>
          <button>resp 1</button>
          <button>resp 2</button>
          <button>resp 3</button>
          <button>resp 4</button>
        </div>
      </Modal>
    </MainContainer>
  )
}

export default Questions
