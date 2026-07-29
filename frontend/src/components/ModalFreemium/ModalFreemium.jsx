import React from "react";
import * as S from "./styles";

export default function ModalFreemium({ isOpen, onClose }) {
  if (!isOpen) return null;

  const lidarComUpgrade = () => {
    alert("Redirecionando para a página de Checkout do Poti PRO... 🫙✨");
    // Futura integração com o gateway de pagamento na Sprint de Monetização
  };

  return (
    <S.Overlay $isOpen={isOpen} onClick={onClose}>
      <S.ModalCard onClick={(e) => e.stopPropagation()}>
        <S.Badge>Limite Atingido 🫙</S.Badge>

        <S.Titulo>Você é um Poti de Ouro!</S.Titulo>

        <S.Descricao>
          Você atingiu o limite de <strong>30 lançamentos gratuitos</strong>{" "}
          deste mês. Para continuar guardando sem limites, conheça o{" "}
          <strong>Poti PRO</strong>!
        </S.Descricao>

        <S.BeneficiosList>
          <li>✨ Lançamentos ilimitados todo mês</li>
          <li>📊 Histórico completo e exportação de dados</li>
          <li>🎯 Potes e metas personalizadas</li>
        </S.BeneficiosList>

        <S.BotaoPro onClick={lidarComUpgrade}>
          Desbloquear Poti PRO 🚀
        </S.BotaoPro>

        <S.BotaoFechar onClick={onClose}>
          Continuar no plano gratuito
        </S.BotaoFechar>
      </S.ModalCard>
    </S.Overlay>
  );
}
