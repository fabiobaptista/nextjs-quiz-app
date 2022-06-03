import { useAppContext } from '@/context/ContextProvider'
import { useEffect, useState } from 'react'
import Overlay from './Overlay'

import styles from '@/styles/components/main-container.module.scss'

type MainContainerProps = {
  children: React.ReactNode
}
const MainContainer = ({children}: MainContainerProps) => {
  const {isBusy} = useAppContext()
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  useEffect(() => {
    setIsOverlayVisible(isBusy)
  }, [isBusy])
  
  return (
    <>
      {isOverlayVisible && <Overlay/>}
      <div className={styles.container}>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </>
  )
}

export default MainContainer