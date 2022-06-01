import PageTitle from './PageTitle'

import styles from '@/styles/components/modal.module.scss'

type ModalProps = {
  children: React.ReactNode
}
const Modal = ({children}: ModalProps) => {
  return (
    <>
      <PageTitle/>
      <section className={styles.modal}>
        {children}
      </section>
    </>
  )
}

export default Modal
