import React, { useState} from 'react';
import { Mail, Lock, ArrowRight} from 'lucide-react';
import * as C from './styles'
import { post } from '../../services/api';

export default function Cadastro({ irParaLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const lidarComCadastro = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const resposta = await post('/register', {email, senha});
      alert(resposta.message || 'Conta criada com sucesso!');
      irParaLogin();
    } catch (err){
      setErro(err.message);
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
            Cadastrar <ArrowRight size={18} />
          </C.BotaoEnviar>
        </C.Formulario>

        <C.LinkAlternativo>
          Já tem uma conta? <span onClick={() => irParaLogin()}>Entrar</span>
        </C.LinkAlternativo>
      </C.CardCadastro>
    </C.TelaContainer>
  );
};

