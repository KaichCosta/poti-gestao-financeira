import React, { useState } from "react";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import * as C from "./styles";
import { post } from '../../services/api';
import toast from 'react-hot-toast';

export default function Login({ irParaCadastro, onLoginSucesso }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const validarEmail = (valor) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(valor)) {
      setErroEmail('Por favor, insira um e-mail válido (ex: seu@email.com)');
      return false;
    }
    setErroEmail('');
    return true;
  };

  const validarSenha = (valor) => {
    if (valor.length < 6) {
      setErroSenha('A senha deve ter no mínimo 6 caracteres.');
      return false;
    }
    setErroSenha('');
    return true;
  };

  const lidarComLogin = async(e) => {
    e.preventDefault();

    const emailLimpo = email.trim().toLowerCase();

    const isEmailValido = validarEmail(email);
    const isSenhaValida = validarSenha(senha);

    if (!isEmailValido || !isSenhaValida) {
      return; 
    }
    setErro('');
    try {
      const resposta = await post('/login', { email: emailLimpo, senha });   
      
      localStorage.setItem('@Poti:token', resposta.token);
      localStorage.setItem('@Poti:usuario', JSON.stringify(resposta.usuario));

      toast.success(`Bem-vindo, ${resposta.usuario.email}! Login efetuado.`);
      
      setTimeout(() => {
        if (onLoginSucesso) {
          onLoginSucesso();
        }
      }, 1200);
    } catch (err) {
      const mensagemErro = err.response?.data?.erro || 'Erro ao conectar. Tente novamente.';
      setErro(mensagemErro);
      toast.error(mensagemErro);
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (erroEmail) setErroEmail('');
                }}
                onBlur={() => validarEmail(e.target.value)}
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                required
              />
            </C.InputContainer>
            {erroEmail && <C.MensagemErro>{erroEmail}</C.MensagemErro>}
          </C.InputGrupo>

          <C.InputGrupo>
            <label>Senha</label>
            <C.InputContainer>
              <Lock size={20} />
              <C.InputReal 
                type={mostrarSenha ? "text" : "password"} 
                placeholder="Sua Senha"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  if (erroSenha) setErroSenha('');
                }}
                onBlur={(e) => validarSenha(e.target.value)}
                required
              />

              <C.BotaoOlho 
                type="button" /* IMPORTANTE: previne que o form seja enviado ao clicar no olho */
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </C.BotaoOlho>

            </C.InputContainer>
            {erroSenha && <C.MensagemErro>{erroSenha}</C.MensagemErro>}
          </C.InputGrupo>
          {erro && <C.MensagemErro style={{ textAlign: 'center', fontSize: '1rem', marginBottom: '15px' }}>{erro}</C.MensagemErro>}        
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