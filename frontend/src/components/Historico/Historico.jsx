import React, { useState, useEffect } from "react";
import * as C from "./styles";
import { get } from '../../services/api';
import { POTES_UI } from '../../config/potesConfig';

const Historico = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [paginacao, setPaginacao] = useState({
    paginaAtual: 1,
    totalPaginas: 1,
  });

  // Estados dos Filtros
  const [filtroMes, setFiltroMes] = useState(new Date().getMonth() + 1); // Mês atual
  const [filtroAno, setFiltroAno] = useState(new Date().getFullYear()); // Ano atual
  const [filtroPote, setFiltroPote] = useState(""); // Vazio = Todos os potes

  // Função que busca os dados no Backend
  const buscarHistorico = async (pagina = 1) => {
    try {
      let url = `/transacoes?pagina=${pagina}&mes=${filtroMes}&ano=${filtroAno}`;
      if (filtroPote) url += `&pote=${filtroPote}`;

      // Usando o seu serviço padronizado (que já deve colocar o Token JWT)
      const resposta = await get(url);

      // O Axios ou seu api.js geralmente já retorna o JSON direto (ou dentro de resposta.data)
      // Ajuste aqui se o seu api.js retornar dentro de "data" -> resposta.data.transacoes
      if (resposta) {
        setTransacoes(resposta.transacoes || []);
        setPaginacao(resposta.paginacao || { paginaAtual: 1, totalPaginas: 1 });
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    }
  };

  // Dispara a busca toda vez que um filtro ou a página mudar
  useEffect(() => {
    buscarHistorico(paginacao.paginaAtual);
  }, [filtroMes, filtroAno, filtroPote, paginacao.paginaAtual]);

  // Funções de Paginação
  const irParaProximaPagina = () => {
    if (paginacao.paginaAtual < paginacao.totalPaginas) {
      setPaginacao((prev) => ({ ...prev, paginaAtual: prev.paginaAtual + 1 }));
    }
  };

  const irParaPaginaAnterior = () => {
    if (paginacao.paginaAtual > 1) {
      setPaginacao((prev) => ({ ...prev, paginaAtual: prev.paginaAtual - 1 }));
    }
  };

  // Dicionário para traduzir o texto do Back-end para a chave do nosso Front-end
  const mapearTipoGasto = (tipoDoBanco) => {
    if (tipoDoBanco === "Não Essencial") return "nao_essenciais";
    if (tipoDoBanco === "Gasto Fixo" || tipoDoBanco === "Fixos") return "fixos";
    if (tipoDoBanco === "Investimento" || tipoDoBanco === "Investimentos") return "investimentos";
    
    return "fixos"; // Fallback (segurança) caso venha algo inesperado
  };

  return (
    <C.Container>
      <C.Titulo>Histórico de Potes</C.Titulo>

      {/* Barra de Filtros Inteligentes */}
      <C.FiltrosContainer>
        <select
          value={filtroMes}
          onChange={(e) => setFiltroMes(e.target.value)}
        >
          <option value="1">Janeiro</option>
          <option value="2">Fevereiro</option>
          <option value="3">Março</option>
          <option value="4">Abril</option>
          <option value="5">Maio</option>
          <option value="6">Junho</option>
          <option value="7">Julho</option>
          <option value="8">Agosto</option>
          <option value="9">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </select>

        <select
          value={filtroAno}
          onChange={(e) => setFiltroAno(e.target.value)}
        >
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>

        <select
          value={filtroPote}
          onChange={(e) => setFiltroPote(e.target.value)}
        >
          <option value="">Todos os Potes</option>
          <option value="fixos">Gastos Fixos</option>
          <option value="nao_essenciais">Estilo de Vida</option>
          <option value="investimentos">Investimentos</option>
        </select>
      </C.FiltrosContainer>

      {/* Lista de Cards Dinâmicos */}
      <C.ListaTransacoes>
        {transacoes.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666", marginTop: "20px" }}>
            Nenhuma transação encontrada neste período. 🫙
          </p>
        ) : (
          transacoes.map((t) => {
            // 1. Pegamos no valor exato que veio do Back-end (ex: "Não Essencial")
            const tipoOriginal = t.tipoGasto; 

            // 2. Traduzimos para a chave técnica (ex: "nao_essenciais")
            const chaveDoPote = mapearTipoGasto(tipoOriginal);
            
            // 3. Puxamos a cor e o ícone do nosso ficheiro central
            const poteAtual = POTES_UI[chaveDoPote]; 

            return (
              <C.CardTransacao key={t.id} $pote={chaveDoPote}>
                
                <C.GrupoTitulo>
                  <C.IconeWrapper $corPote={poteAtual?.cor || '#04261E'}>
                    {poteAtual?.icone}
                  </C.IconeWrapper>

                  <C.InfoTransacao>
                    <strong>{t.descricao}</strong>
                    <span>{new Date(t.data).toLocaleDateString("pt-BR")} {poteAtual?.nome ? `- ${poteAtual.nome}` : ''}</span>
                  </C.InfoTransacao>
                </C.GrupoTitulo>

                <C.ValorTransacao>
                  R$ {Number(t.valor).toFixed(2).replace(".", ",")}
                </C.ValorTransacao>
                
              </C.CardTransacao>
            )
          })
        )}
      </C.ListaTransacoes>

      {/* Paginação Sênior */}
      {paginacao.totalPaginas > 1 && (
        <C.PaginacaoContainer>
          <button
            onClick={irParaPaginaAnterior}
            disabled={paginacao.paginaAtual === 1}
          >
            Anterior
          </button>

          <span>
            Pág {paginacao.paginaAtual} de {paginacao.totalPaginas}
          </span>

          <button
            onClick={irParaProximaPagina}
            disabled={paginacao.paginaAtual === paginacao.totalPaginas}
          >
            Próxima
          </button>
        </C.PaginacaoContainer>
      )}
    </C.Container>
  );
};

export default Historico;
