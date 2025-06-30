import { render, screen } from '@testing-library/react'
import { Hello } from './Hello'

describe('Hello component', () => {
  it('should render a greeting message with the name', () => {
    render(<Hello message="Hello World" />)
    expect(screen.getByText('Mensagem protegida: Hello World')).toBeInTheDocument()
  })
})