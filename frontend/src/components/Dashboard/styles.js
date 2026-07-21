import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 1rem;
`;

export const ResumoSaldoCard = styled.div`
  background-color: ${props => props.theme.colors.branco};
  border: 2px solid ${props => props.theme.colors.TextoPrimario};
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 0.875rem;
    color: ${props => props.theme.colors.cinza};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 2rem;
    font-weight: 800;
    color: ${props => props.theme.colors.TextoPrimario};
  }
`;

export const PoteCard = styled.div`
  background-color: ${props => props.theme.colors.branco};
  border: 1.5px solid ${props => props.theme.colors.cinza};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const PoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .titulo {
    font-weight: 700;
    font-size: 1rem;
    color: ${props => props.theme.colors.TextoPrimario};
  }

  .valores {
    font-size: 0.875rem;
    color: ${props => props.theme.colors.cinza};
    span {
      font-weight: 700;
      color: ${props => props.theme.colors.TextoPrimario};
    }
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${props => props.theme.colors.planoDeFundo};
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

export const ProgressBarFill = styled.div`
  width: ${props => Math.min(props.percent, 100)}%;
  height: 100%;
  transition: width 0.4s ease-in-out, background-color 0.3s ease;
  
  background-color: ${props => {
    if (props.percent >= 100) return props.theme.colors.perigo;
    if (props.percent >= 80) return props.theme.colors.cuidado;
    return props.theme.colors.sucesso;
  }};
`;

export const PercentLabel = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  align-self: flex-end;
  color: ${props => {
    if (props.percent >= 100) return props.theme.colors.perigo;
    if (props.percent >= 80) return props.theme.colors.cuidado;
    return props.theme.colors.sucesso;
  }};
`;