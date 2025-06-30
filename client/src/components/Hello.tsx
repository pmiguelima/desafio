type HelloProps = {
  message: string
}

export function Hello({ message }: HelloProps) {
  return <strong>Mensagem protegida: {message}</strong>
}