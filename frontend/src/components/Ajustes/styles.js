import styled from 'styled-components';

export const Container = styled.div`
  padding: 1.5rem;
  min-height: 100vh; 
`;

export const Titulo = styled.h1`
  color: ${(props) => props.theme.colors.textoPrimario || "#04261E"};
  font-size: 30px;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.textoPrimario || "#04261E"};
  opacity: 0.6;
  margin-bottom: 8px;
  margin-left: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Card = styled.div`
  background-color:  ${(props) => props.theme.colors.branco};
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(4, 38, 30, 0.04);
`;

export const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: transparent;
  border-bottom: 1px solid rgba(4, 38, 30, 0.06);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgba(4, 38, 30, 0.02);
  }

  &:active {
    background-color: rgba(4, 38, 30, 0.05);
  }
`;

export const RowLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  font-weight: 500;
  /* Se for a zona de perigo, fica vermelho, senão verde escuro */
  color: ${(props) => (props.$danger ? props.theme.colors.perigo || "#E7390D" : props.theme.colors.textoPrimario || "#04261E")};

  svg {
    opacity: ${(props) => (props.$danger ? 1 : 0.7)};
  }
`;

export const RowRight = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.textoPrimario || "#04261E"};
  opacity: 0.3; /* Deixa as setinhas discretas */
`;

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