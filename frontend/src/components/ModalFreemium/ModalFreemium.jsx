import React from "react";
import * as S from "./styles";
import toast from 'react-hot-toast';

export default function ModalFreemium({ isOpen, onClose, isLimiteAtingido = true }) {
  if (!isOpen) return null;

  const lidarComUpgrade = () => {
    toast.success("Redirecionando para a página de Checkout do Poti PRO... 🫙✨");
    // Futura integração com o gateway de pagamento na Sprint de Monetização
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalCard onClick={(e) => e.stopPropagation()}>
        <S.Titulo>Conheça o Poti PRO</S.Titulo>

        {isLimiteAtingido ? (
          <S.Descricao>
            Você atingiu o limite de <strong>30 lançamentos gratuitos</strong>{" "}
            deste mês. Para continuar guardando sem limites, conheça o{" "}
            <strong>Poti PRO</strong>!
          </S.Descricao>
        ) : (
          <S.Descricao>
            Leve sua organização financeira para o próximo nível. 
            Desbloqueie todos os recursos exclusivos com o <strong>Poti PRO</strong>!
          </S.Descricao>
        )}

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
