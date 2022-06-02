import { useAppContext } from '@/context/ContextProvider'
import styles from '@/styles/components/main-container.module.scss'
import { useEffect, useState } from 'react'
import Overlay from './Overlay'

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