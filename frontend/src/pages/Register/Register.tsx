import { useState } from "react";
import { Container, Form } from "./styles";
import Button from "../../components/Button";
import axios from "axios";
import Input from "../../components/Input";
import { Link } from "react-router-dom";

interface iRegisterProps {
  nickname: string;
  email: string;
  password: string;
}

const Register = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = ({ nickname, email, password }: iRegisterProps) => {
    if (!nickname || !email || !password) {
      return alert("Preencha todos os campos");
    }

    if (password.length < 6) {
      return alert("A senha deve conter no mínimo 6 caracteres!");
    }

    const payload = { nickname, email, password };
    axios
      .post(
        "https://distributed-chat-backend.onrender.com/users/create",
        payload
      )
      .then(() => {
        alert("Usuario cadastrado");
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          alert(err.response.data.message);
        } else {
          alert("Não foi possível cadastrar");
        }
      });
  };

  return (
    <Container>
      <h1>Distributed Chat</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <h2>Crie sua conta</h2>

        <Input
          type="text"
          label="nickname"
          title="Apelido"
          placeholder="Maria_da_Silva"
          required
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Input
          type="email"
          label="email"
          title="Email"
          placeholder="exemplo@exemplo.com.br"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          label="password"
          title="Senha"
          placeholder="No mínimo 6 caracteres"
          minLength={6}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          title="Criar conta"
          onClick={() => handleRegister({ nickname, email, password })}
        />
        <Link to="/">Ja tenho conta</Link>
      </Form>
    </Container>
  );
};

export default Register;
