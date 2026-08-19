import React, { useState } from "react";
import { FiLogOut, FiEdit, FiStar } from "react-icons/fi";
import * as C from "./styles";
import ModalFreemium from "../ModalFreemium/ModalFreemium";

export const Ajustes = ({ onLogout, onEditarOrcamento }) => {
  const [modalProAberto, setModalProAberto] = useState(false);
  console.log(modalProAberto)
  return (
    <C.Container>
      <C.Titulo>Ajustes</C.Titulo>

      <C.BotaoProCallout onClick={() => setModalProAberto(true)}>
        <FiStar size={18} />
        Seja Poti PRO
      </C.BotaoProCallout>
      
      <C.BotaoEditar onClick={onEditarOrcamento}>
        <FiEdit size={18} />
        Editar Salário e Potes
      </C.BotaoEditar>

      <C.BotaoSair onClick={onLogout}>
        <FiLogOut size={18} />
        Sair da Conta
      </C.BotaoSair>

      <C.RodapeSobre>
        <p><strong>POTI App Gestão</strong> - v1.0</p>
        <p>Desenvolvido com 💚 por <strong>Kode Sistemas</strong></p>
      </C.RodapeSobre>

      <ModalFreemium 
        isOpen={modalProAberto}
        onClose={() => setModalProAberto(false)}
        isLimiteAtingido={false}
      />

    </C.Container>
  );
};
