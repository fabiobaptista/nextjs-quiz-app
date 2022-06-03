import styles from '@/styles/components/message.module.scss'

type MessageProps = {
  message: string
}

const Message = ({message}: MessageProps) => {
  return <div className={styles.message}>{message}</div>
}

export default Message