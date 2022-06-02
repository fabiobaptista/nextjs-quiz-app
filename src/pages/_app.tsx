import '../styles/app.scss'
import type { AppProps } from 'next/app'
import ContextProvider from '@/context/ContextProvider'

function QuizApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default QuizApp
