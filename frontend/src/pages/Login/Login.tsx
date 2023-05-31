import{  useState } from 'react'
import { Container, Form } from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../providers/auth'


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {handleLogin} = useAuthContext()

  return (
    <Container>
    <h1>
      Distributed Chat
    </h1>
    <Form onSubmit={(e) => e.preventDefault()}>
      <h2>Crie sua conta</h2>
      <Input
        type="email"
        label="email"
        title="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        label="password"
        title="Senha"
        minLength={6}
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        title="Entrar"
        onClick={()=> handleLogin({email, password})}

      />
      <Link to="/register">Criar conta</Link>
    </Form>
  </Container>
  )
}

export default Login
