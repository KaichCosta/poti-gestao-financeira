import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: ${props => props.theme.colors.planoDeFundo || '#E0FFEC'};
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 6px;
  background-color: rgba(4, 38, 30, 0.1);
  border-radius: 3px;
  margin-bottom: 32px;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  height: 100%;
  width: ${props => props.width || '0%'};
  background-color: ${props => props.theme.colors.textoPrimario || '#04261E'};
  transition: width 0.3s ease-in-out;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #FFFFFF;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0px 8px 24px rgba(4, 38, 30, 0.06);
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 24px;
    color: ${props => props.theme.colors.textoPrimario || '#04261E'};
    margin-bottom: 12px;
    font-weight: 700;
  }

  p {
    font-size: 14px;
    color: rgba(4, 38, 30, 0.7);
    margin-bottom: 24px;
    line-height: 1.5;
  }
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  label {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    color: ${props => props.color || props.theme.colors.textoPrimario || '#04261E'};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  font-size: 16px;
  border: 2px solid ${props => props.borderColor || 'rgba(4, 38, 30, 0.15)'};
  border-radius: 8px;
  background-color: #FFFFFF;
  color: ${props => props.theme.colors.textoPrimario || '#04261E'};
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: ${props => props.borderColor || props.theme.colors.textoPrimario || '#04261E'};
  }

  /* Remove setas padrões do input number */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.textoPrimario || '#04261E'};
  color: ${props => props.theme.colors.planoDeFundo || '#E0FFEC'};
  margin-top: 12px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const BadgeValidacao = styled.div`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
  background-color: ${props => props.isValid ? 'rgba(8, 74, 36, 0.1)' : 'rgba(231, 57, 13, 0.1)'};
  color: ${props => props.isValid ? '#084A24' : '#E7390D'};
`;

