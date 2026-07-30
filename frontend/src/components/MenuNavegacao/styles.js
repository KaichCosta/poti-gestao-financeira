import styled from "styled-components";

export const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  background-color: ${(props) => props.theme.colors.branco|| "#FAFAFA"}; /* Fundo Creme/Ouro Claro */
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0;
  padding-bottom: env(
    safe-area-inset-bottom,
    12px
  );
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export const NavItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  /* A mágica da prop transiente ($ativo): Verde Gnomo se ativo, Verde Escuro se inativo */
  color: ${(props) => (props.$ativo ? "#084A24" : "#04261E")};
  opacity: ${(props) => (props.$ativo ? "1" : "0.5")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  flex: 1; /* Faz os botões dividirem o espaço igualmente */

  svg {
    font-size: 24px;
    margin-bottom: 4px;
    /* Efeito de "pulo" ao clicar */
    transform: ${(props) => (props.$ativo ? "scale(1.1)" : "scale(1)")};
    transition: transform 0.2s ease;
  }

  span {
    font-size: 12px;
    font-weight: ${(props) => (props.$ativo ? "bold" : "normal")};
  }

  &:hover {
    opacity: 0.8;
  }
`;
