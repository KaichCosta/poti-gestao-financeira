import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 1.25rem;
  background-color: ${props => props.theme.colors.branco};
  border-radius: 16px;
  border: 1.5px solid ${props => props.theme.colors.cinza};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.875rem;
    font-weight: 700;
    color: ${props => props.theme.colors.TextoPrimario};
  }

  input {
    padding: 0.75rem;
    border-radius: 8px;
    border: 1.5px solid ${props => props.theme.colors.cinza};
    font-size: 1rem;
    outline: none;
    background-color: ${props => props.theme.colors.planoDeFundo};
    color: ${props => props.theme.colors.TextoPrimario};
    
    &:focus {
      border-color: ${props => props.theme.colors.TextoPrimario};
    }
  }
`;

export const ChipGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Chip = styled.button`
  type: button;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background-color: ${props => props.active 
    ? props.theme.colors.TextoPrimario 
    : props.theme.colors.planoDeFundo
  };
  color: ${props => props.active 
    ? props.theme.colors.branco 
    : props.theme.colors.TextoPrimario
  };
  border: 1.5px solid ${props => props.active 
    ? props.theme.colors.TextoPrimario 
    : props.theme.colors.cinza
  };

  &:hover {
    filter: brightness(0.95);
  }
`;

export const SubmitButton = styled.button`
  background-color: ${props => props.theme.colors.TextoPrimario};
  color: ${props => props.theme.colors.branco};
  padding: 0.875rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.sucesso};
  }
`;