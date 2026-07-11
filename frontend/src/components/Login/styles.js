import styled from "styled-components";

export const TelaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.planoDeFundo};
`;

export const CardLogin = styled.div`
  background-color: ${(props) => props.theme.colors.branco};
  padding: 40px 30px;
  border-radius: 24px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px
  rgba(4, 38, 30, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Cabecalho = styled.div`
  text-align: center;
  margin-bottom: 32px;

  h1 {
    font-size: 28px;
    color: ${(props) => props.theme.colors.TextoPrimario};
    font-weight: 800;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: ${(props) => props.theme.colors.cinza};
  }
`;

export const Formulario = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGrupo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.TextoPrimario};
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(160, 170, 178, 0.1);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 0 16px;
  height: 52px;
  transition: all 0.2s ease-in-out;

  svg {
    color: ${(props) => props.theme.colors.cinza};
    margin-right: 12px;
  }

  &:focus-within {
    border-color: ${(props) => props.theme.colors.TextoPrimario};
    background-color: ${(props) => props.theme.colors.branco};

    svg {
      color: ${(props) => props.theme.colors.TextoPrimario};
    }
  }
`;

export const InputReal = styled.input`
  flex: 1;
  height: 100%;
  background: transparent;
  color: ${(props) => props.theme.colors.TextoPrimario};
  font-size: 16px;
  font-weight: 500;

  &::placeholder {
    color: ${(props) => props.theme.colors.cinza};
  }
`;

export const BotaoEnviar = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 52px;
  background-color: ${(props) => props.theme.colors.sucesso};
  color: ${(props) => props.theme.colors.branco};
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  margin-top: 12px;

  &:hover {
    background-color: ${(props) => props.theme.colors.TextoPrimario};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const LinkAlternativo = styled.p`
  font-size: 14px;
  margin-top: 24px;
  color: ${(props) => props.theme.colors.cinza};

  span {
    color: ${(props) => props.theme.colors.sucesso};
    font-weight: 600;
    cursor: pointer;
    margin-left: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
`;
