import React from "react";
import { FiEdit, FiLogOut } from "react-icons/fi";
import * as C from "./styles";

export const Ajustes = ({ onLogout, onEditarOrcamento }) => {
  return (
    <C.Container>
      <C.Titulo>Ajustes</C.Titulo>
      
      <C.BotaoEditar onClick={onEditarOrcamento}>
        <FiEdit size={18} />
        Editar Salário e Potes
      </C.BotaoEditar>

      <C.BotaoSair onClick={onLogout}>
        <FiLogOut size={18} />
        Sair da Conta
      </C.BotaoSair>
    </C.Container>
  );
};
