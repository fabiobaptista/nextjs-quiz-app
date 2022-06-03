import Image from 'next/image'

import styles from '@/styles/components/stars.module.scss'

type StarsProps = {
  total: number
  correct: number,
  size?: number
}

const Stars = ({ total, correct, size = 35 }: StarsProps) => {

  function buildStarts() {
    const starts = []
    for(let i = 0; i < total; i++) {
      starts.push(
        <div key={i}>
          <Image
            src= { i >= correct ? "/images/star-empty.png" : "/images/star-filled.png" }
            width={size}
            height={size}
            alt="star"
          />
        </div>
      )
    }
    return starts
  }

  return (
    <div className={styles.stars}>
      { buildStarts() }
    </div>
  )
}

export default Stars