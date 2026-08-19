import React, { useState } from "react";
import { FiLogOut, FiEdit, FiStar, FiChevronRight, FiInfo } from "react-icons/fi";
import * as C from "./styles";
import ModalFreemium from "../ModalFreemium/ModalFreemium";
import toast from 'react-hot-toast';

export const Ajustes = ({ onLogout, onEditarOrcamento }) => {
  const [modalProAberto, setModalProAberto] = useState(false);

  return (
    <C.Container>
      <C.Titulo>Ajustes</C.Titulo>

      <C.BotaoProCallout onClick={() => setModalProAberto(true)}>
        <div className="pro-content">
          <FiStar size={18} color="#E0FFEC"/>
          Seja Poti PRO
        </div>
        <FiChevronRight size={18} />
      </C.BotaoProCallout>
      
      <C.SectionTitle>Meu Orçamento</C.SectionTitle>
      <C.Card>
        <C.ActionRow onClick={onEditarOrcamento}>
          <C.RowLeft>
            <FiEdit size={18} />
            <span>Editar Salário, Potes e Dia da Virada</span>
          </C.RowLeft>
          <C.RowRight>
            <FiChevronRight size={18} />
          </C.RowRight>
        </C.ActionRow>
      </C.Card>

      <C.SectionTitle>Sistema</C.SectionTitle>
      <C.Card>
        <C.ActionRow onClick={() => toast.success(
          "POTI App Gestão - v1.0\n\n" +
          "Gestão financeira simples baseada no Método dos Potes.\n\n" +
          "• 50% Gastos Fixos\n" +
          "• 30% Estilo de Vida\n" +
          "• 20% Investimentos\n\n" +
          "Desenvolvido por Kaích Costa - Kode Sistemas\n\n" +
          "Suporte: kaichhc@gmail.com"
          
            )
          }>
          <C.RowLeft>
            <FiInfo size={18} />
            <span>Sobre o App</span>
          </C.RowLeft>
          <C.RowRight>
            <span style={{ fontSize: '0.85rem' }}>v1.0</span>
            <FiChevronRight size={18} style={{ marginLeft: '8px' }} />
          </C.RowRight>
        </C.ActionRow>
      </C.Card>

      <C.SectionTitle>Conta</C.SectionTitle>
      <C.Card>
        <C.ActionRow onClick={onLogout}>
          <C.RowLeft $danger>
            <FiLogOut size={18} />
            <span>Sair da Conta</span>
          </C.RowLeft>
        </C.ActionRow>
      </C.Card>

      <C.RodapeSobre>
        <p><strong>POTI App Gestão</strong></p>
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
