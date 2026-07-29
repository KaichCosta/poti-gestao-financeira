import styled from "styled-components";

export const Overlay = styled.div`
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(4, 38, 30, 0.7);
  backdrop-filter: blur(4px);
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 1rem;
`;

export const ModalCard = styled.div`
  background-color: #E0FFEC;
  border-radius: 16px;
  padding: 2rem 1.5rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border: 2px solid ${(props) => props.theme.colors.perigo || "#E7390D"};
  position: relative;
  animation: modalAnimation 0.3s ease-out forwards;

  @keyframes modalAnimation {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export const Badge = styled.span`
  background-color: ${(props) => props.theme.colors.perigo || "#E7390D"};
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  letter-spacing: 0.5px;
  display: inline-block;
  margin-bottom: 1rem;
`;

export const Titulo = styled.h2`
  color: ${(props) => props.theme.colors.TextoPrimario || "#04261E"};
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
`;

export const Descricao = styled.p`
  color: ${(props) => props.theme.colors.TextoPrimario || "#04261E"};
  font-size: 0.95rem;
  line-height: 1.4;
  opacity: 0.9;
  margin-bottom: 1.5rem;

  strong {
    color: ${(props) => props.theme.colors.perigo || "#E7390D"};
  }
`;

export const BeneficiosList = styled.ul`
  list-style: none;
  text-align: left;
  margin-bottom: 1.75rem;
  padding: 0 0.5rem;

  li {
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.TextoPrimario || "#04261E"};
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
  }
`;

export const BotaoPro = styled.button`
  width: 100%;
  background-color: ${(props) => props.theme.colors.TextoPrimario || "#04261E"};
  color: #e0ffec;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.875rem;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(4, 38, 30, 0.2);
  transition:
    transform 0.2s ease,
    filter 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
`;

export const BotaoFechar = styled.button`
  background: transparent;
  color: ${(props) => props.theme.colors.TextoPrimario || "#04261E"};
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 1rem;
  opacity: 0.7;
  text-decoration: underline;

  &:hover {
    opacity: 1;
  }
`;
