import styles from '@/styles/components/main-container.module.scss'

type MainContainerProps = {
  children: React.ReactNode
}
const MainContainer = ({children}: MainContainerProps) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

export default MainContainer