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