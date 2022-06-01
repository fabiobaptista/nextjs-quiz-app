import MainContainer from '@/components/MainContainer'
import Modal from '@/components/Modal'
import { useAppContext } from '@/context/ContextProvider'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'

const Questions: NextPage = () => {
  const route = useRouter()
  const context = useAppContext()

  return (
    <MainContainer>
      <Modal>
        <div onClick={() => route.push('/') }>{context.name}</div>
      </Modal>
    </MainContainer>
  )
}

export default Questions
