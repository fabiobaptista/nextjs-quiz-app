import styles from '@/styles/components/overlay.module.scss'

const Overlay = () => {
  return (
    <div className={styles.overlay}>
    <div className={styles.wrapper}>
      <span className={`${styles.circle} ${styles.circle1}`}></span>
      <span className={`${styles.circle} ${styles.circle2}`}></span>
      <span className={`${styles.circle} ${styles.circle3}`}></span>
      <span className={`${styles.circle} ${styles.circle4}`}></span>
      <span className={`${styles.circle} ${styles.circle5}`}></span>
      <span className={`${styles.circle} ${styles.circle6}`}></span>
      <span className={`${styles.circle} ${styles.circle7}`}></span>
      <span className={`${styles.circle} ${styles.circle8}`}></span>
  </div>
 </div>
  )
}

export default Overlay