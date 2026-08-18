import React from "react";
import { FiLogOut } from "react-icons/fi";
import * as C from "./styles";

export const Ajustes = ({ onLogout }) => {
  return (
    <C.Container>
      {/* Outras configurações do usuário... */}

      <C.BotaoSair onClick={onLogout}>
        <FiLogOut size={18} />
        Sair da Conta
      </C.BotaoSair>
    </C.Container>
  );
};
