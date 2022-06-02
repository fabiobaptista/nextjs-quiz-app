import styles from '@/styles/components/chart.module.scss'
import { useEffect, useState } from 'react'
type ChartProps = {
  total: number
  correct: number
}

const Chart = ({ total, correct }: ChartProps) => {
  const [percentual, setPercentual] = useState(0)
  useEffect(() => {
    setPercentual(360 - ((360 / total) * correct))
  }, [total, correct])
  return (
    // TODO - receive color by params or define dynamically
    <div className={styles.chart} style={{ background: `conic-gradient(white 0deg ${percentual}deg, #01AD97 ${percentual}deg 360deg)`}}>
      <span>
      <span></span>
      </span>
      <div>
        <div>{correct}/{total}</div>
      </div>
    </div>
  )
}

export default Chart