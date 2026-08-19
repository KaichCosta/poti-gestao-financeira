import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
`;

export const Titulo = styled.h1`
  color: ${(props) => props.theme.colors.textoPrimario || "#04261E"};
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
`;

// Adicione no seu styles.js da pasta Ajustes

export const BotaoProCallout = styled.button`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, #084A24 0%, #04261E 100%);
  color: ${props => props.theme.colors.planoDeFundo};
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(4, 38, 30, 0.2);
  margin-bottom: 12px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(4, 38, 30, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const BotaoEditar = styled.button`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: transparent;
  color: ${props => props.theme.colors.sucesso};
  border: 1px solid ${props => props.theme.colors.branco};
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
`;

export const BotaoSair = styled.button`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: transparent;
  color: ${props => props.theme.colors.perigo};
  border: 1px solid ${props => props.theme.colors.branco};
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  
  &:hover {
    background-color: rgba(231, 57, 13, 0.08);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const RodapeSobre = styled.div`
  margin-top: 48px; /* Dá um respiro grande em relação aos botões */
  padding-bottom: 24px;
  text-align: center;
  
  color: ${props => props.theme.colors.sucesso};
  opacity: 0.6;
  font-size: 0.85rem;
  line-height: 1.4;

  p {
    margin: 0;
  }

  strong {
    font-weight: 600;
  }
`;