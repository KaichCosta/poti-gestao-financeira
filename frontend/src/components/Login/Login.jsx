import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import * as C from "./styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const lidarComLogin = (e) => {
    e.preventDefault();
    console.log("Tentativa de login capturada no front:", { email, senha });
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
          Não tem uma conta? <span>Cadastrar-se</span>
        </C.LinkAlternativo>

      </C.CardLogin>
    </C.TelaContainer>
  );
}