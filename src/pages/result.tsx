import MainContainer from '@/components/MainContainer'
import Modal from '@/components/Modal'
import { useAppContext } from '@/context/ContextProvider'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import Image from 'next/image'

import styles from '@/styles/pages/result.module.scss'

const Result: NextPage = () => {
  const route = useRouter()
  const context = useAppContext()

  return (
    <MainContainer>
      <Modal className='alignItemsStretch'>
        <div className={`${styles.cardHeader}` }>
          Resultado
        </div>
        <div className={styles.cardResult}>
          <Image className='star' src={context.name ? "/star-filled.png" : "/star-empty.png"} alt="star" width="50" height="50" />
          <Image className='star' src="/star-empty.png" alt="star" width="50" height="50" />
          <Image className='star' src="/star-empty.png" alt="star" width="50" height="50" />
        </div>
        <div className={styles.cardFooter}>
          <button onClick={() => route.push('/')}>Fim</button>
        </div>
      </Modal>
    </MainContainer>
  )
}

export default Result
