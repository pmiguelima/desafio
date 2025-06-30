import { useState } from 'react'
import { Hello } from './components/Hello'

const keycloak_host = 'http://localhost:8081'
const keycloak_realm = 'desafio'

interface TokenResponse {
  access_token: string
  expires_in: number
  refresh_token: string
  token_type: string
}

function App() {
  const [username, setUsername] = useState('user1')
  const [password, setPassword] = useState('admin')
  const [token, setToken] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    params.append('grant_type', 'password')
    params.append('client_id', 'app1')
    params.append('username', username)
    params.append('password', password)

    try {
      const res = await fetch(`${keycloak_host}/realms/${keycloak_realm}/protocol/openid-connect/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      })

      if (!res.ok) throw new Error('Erro no login')

      const data: TokenResponse = await res.json()
      setToken(data.access_token)

      // Requisição protegida para a API Laravel
      const apiRes = await fetch('http://localhost:8080/api/hello', {
        headers: {
          Authorization: `Bearer ${data.access_token}`
        }
      })

      const json = await apiRes.json()
      setMessage(json.message)
    } catch (err) {
      console.log(err)
      setMessage('Erro no login ou na chamada da API')
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Login com Keycloak</h1>
      {!token ? (
        <form className="mx-auto" style={{ maxWidth: 400 }} onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Usuário</label>
            <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
      ) : (
        <div className="alert alert-success text-center">
          <p>Token obtido e acesso à API autorizado ✅</p>
          <Hello message={message} />
        </div>
      )}
    </div>
  )
}

export default App