import React, { useState} from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff} from 'lucide-react';
import * as C from './styles'
import { post } from '../../services/api';
import toast from 'react-hot-toast';

export default function Cadastro({ irParaLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(''); 
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const validarEmail = (valor) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(valor)) {
      setErroEmail('Por favor, insira um e-mail válido.');
      return false;
    }
    setErroEmail('');
    return true;
  };

  const validarSenha = (valor) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{6,50}$/;
    if (!regex.test(valor)) {
      setErroSenha('A senha precisa ter no mínimo 6 caracteres, 1 letra maiúscula e 1 número.');
      return false;
    }
    setErroSenha('');
    return true;
  };

  const lidarComCadastro = async (e) => {
    e.preventDefault();
    const emailLimpo = email.trim().toLowerCase();
    const isEmailValido = validarEmail(email);
    const isSenhaValida = validarSenha(senha);

    // Trava se algum estiver errado
    if (!isEmailValido || !isSenhaValida) {
      return;
    }
    try {
      setCarregando(true);
      setErro('');

      const resposta = await post('/register', {email: emailLimpo, senha: senha});
      toast.success(resposta.message || 'Conta criada com sucesso!');
      setTimeout(() => {
        if (irParaLogin) {
          irParaLogin();
        }
      }, 1200);
    } catch (err){
      const mensagemErro = err.message || 'Erro ao criar conta. Tente novamente.';
      setErro(mensagemErro);
      toast.error(mensagemErro);
    } finally {
    setCarregando(false);
    }
  };
  return (
    <C.TelaContainer>
      <C.CardCadastro>
        <C.Cabecalho>
          <h1>Criar Conta</h1>
          <p>Sobrou dinheiro? Poti guardar!</p>
        </C.Cabecalho>

        <C.Formulario onSubmit={lidarComCadastro}>
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
                onBlur={(e) => validarEmail(e.target.value)}
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
                placeholder="Crie uma senha forte"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  if (erroSenha) setErroSenha('');
                }}
                onBlur={(e) => validarSenha(e.target.value)}
                required
              />

              <C.BotaoOlho 
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </C.BotaoOlho>

            </C.InputContainer>
            {erroSenha && <C.MensagemErro>{erroSenha}</C.MensagemErro>}
          </C.InputGrupo>

          {erro && (
            <C.MensagemErro style={{ textAlign: 'center', marginBottom: '15px', fontSize: '1rem' }}>
              {erro}
            </C.MensagemErro>
          )}        

          <C.BotaoEnviar type="submit" disabled={carregando}>
            {carregando ? 'Cadastrando...' : (
              <>Cadastrar <ArrowRight size={18} /></>
            )}
          </C.BotaoEnviar>
        </C.Formulario>

        <C.LinkAlternativo>
          Já tem uma conta? <span onClick={() => irParaLogin()}>Entrar</span>
        </C.LinkAlternativo>
      </C.CardCadastro>
    </C.TelaContainer>
  );
};

