import '../styles/app.scss'
import type { AppProps } from 'next/app'
import ContextProvider, { useAppContext } from '@/context/ContextProvider'
import Overlay from '@/components/Overlay'


function QuizApp({ Component, pageProps }: AppProps) {
  const context = useAppContext()
  return (
    <ContextProvider>
      {context.isBusy && <Overlay/>}
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default QuizApp
