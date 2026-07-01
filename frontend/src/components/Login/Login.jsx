import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import * as C from "./styles";
import { post } from '../../services/api';

export default function Login({ irParaCadastro }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState('');

  const lidarComLogin = async(e) => {
    e.preventDefault();
    setErro('');
    try {
      // Dispara o POST real para o backend na rota /register
      const resposta = await post('/login', { email, senha });
      
      localStorage.setItem('@Poti:token', resposta.token);
      localStorage.setItem('@Poti:usuario', JSON.stringify(resposta.usuario));

      alert(`Bem-vindo, ${resposta.usuario.email}! Login efetuado.`)
      // TODO: Redirecionar para o Dashboard futuramente
    } catch (err) {
      // Exibe na tela a mensagem que veio lá do Express (Ex: "Este e-mail já está cadastrado")
      setErro(err.message);
    }
  };

  return (
    <C.TelaContainer>
      <C.CardLogin>
        <C.Cabecalho>
          <h1>Acessar Poti</h1>
          <p>Seja bem-vindo de volta!</p>
        </C.Cabecalho>
        <C.Formulario onSubmit={lidarComLogin}>
          <C.InputGrupo>
            <label>E-mail</label>
            <C.InputContainer>
              <Mail size={20} />
              <C.InputReal 
                type="email" 
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </C.InputContainer>
          </C.InputGrupo>

          <C.InputGrupo>
            <label>Senha</label>
            <C.InputContainer>
              <Lock size={20} />
              <C.InputReal 
                type="password" 
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </C.InputContainer>
          </C.InputGrupo>

          <C.BotaoEnviar type="submit">
            Entrar <LogIn size={18} />
          </C.BotaoEnviar>
        </C.Formulario>

        <C.LinkAlternativo>
          Não tem uma conta? <span onClick={irParaCadastro}>Cadastrar-se</span>
        </C.LinkAlternativo>

      </C.CardLogin>
    </C.TelaContainer>
  );
}