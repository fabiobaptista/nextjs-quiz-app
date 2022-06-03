import { render, screen } from '@testing-library/react'
import Main from '../pages/index'

describe('Home', () => {
  it('renders a Main page', () => {
    render(<Main />)

    const inputJogador = screen.getByTestId('input-player')
    const inputCategory = screen.getByTestId('input-category')
    const btnStart = screen.getByTestId('btn-start')

    expect(inputJogador).toBeInTheDocument()
    expect(inputCategory).toBeInTheDocument()
    expect(btnStart).toBeInTheDocument()
  })
})