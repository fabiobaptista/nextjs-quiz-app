import PageTitle from './PageTitle'

import styles from '@/styles/components/modal.module.scss'

type ModalProps = {
  children: React.ReactNode,
  className?: string
}
const Modal = ({children, className}: ModalProps) => {
  return (
    <>
      <PageTitle/>
      <section className={`${styles.modal} ${className}`}>
        {children}
      </section>
    </>
  )
}

export default Modal
