import styled from "styled-components";

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

export const FiltrosContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  select {
    flex: 1;
    min-width: 100px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: #f4f4f4;
    color: #04261e;
    font-size: 14px;
  }
`;

export const ListaTransacoes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CardTransacao = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.branco || "#FAFAFA"};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-left: 6px solid
    ${(props) => {
      // A mágica das cores dinâmicas baseadas no Pote!
      if (props.$pote === "fixos") return "#E7390D";
      if (props.$pote === "nao_essenciais") return "#F26716";
      if (props.$pote === "investimentos") return "#084A24";
      return "#ccc";
    }};
`;

export const GrupoTitulo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background-color: ${(props) => props.$corPote}26; 
  color: ${(props) => props.$corPote};
  flex-shrink: 0;
`;

export const InfoTransacao = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    color: #04261e;
    font-size: 16px;
  }

  span {
    color: #666;
    font-size: 12px;
  }
`;

export const ValorTransacao = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #04261e;
`;

export const PaginacaoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-bottom: 20px;

  button {
    padding: 10px 16px;
    border-radius: 8px;
    background-color: #04261e;
    color: #fff;
    font-weight: bold;
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  span {
    color: #04261e;
    font-weight: bold;
  }
`;
