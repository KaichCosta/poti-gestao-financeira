import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import * as C from "./styles";
import { post } from '../../services/api';

export default function Login({ irParaCadastro, logadoComSucesso }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState('');

  const lidarComLogin = async(e) => {
    e.preventDefault();
    setErro('');
    try {
      // 2. Usando a sua função 'post' injetada do seu service/api de forma limpa:
      const resposta = await post('/login', { email, senha });   
      
      // 3. No seu service estruturado, a resposta já costuma devolver os dados direto (.data)
      localStorage.setItem('@Poti:token', resposta.token);
      localStorage.setItem('@Poti:usuario', JSON.stringify(resposta.usuario));

      alert(`Bem-vindo, ${resposta.usuario.email}! Login efetuado.`);
      
      // 4. Dispara a mudança de estado para o App.js abrir o Onboarding
      if (logadoComSucesso) {
        logadoComSucesso();
      }
    } catch (err) {
      // Pega a mensagem tratada do backend ou o fallback de erro de rede
      setErro(err.response?.data?.erro || err.message);
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