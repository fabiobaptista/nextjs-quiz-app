import '../styles/app.scss'
import type { AppProps } from 'next/app'

function QuizApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default QuizApp
