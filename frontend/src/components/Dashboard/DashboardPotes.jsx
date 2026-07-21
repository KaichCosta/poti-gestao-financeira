import React from 'react';
import * as S from './styles';

export default function DashboardPotes({ configuracao, gastos }) {
  // Exemplo de dados vindos da API:
  // configuracao = { receitaMensal: 3000, porcentagemFixos: 50, porcentagemNaoEssenc: 30, porcentagemInvest: 20 }
  // gastos = { Fixo: 1200, "Não Essencial": 450, Investimento: 100 }

  const receita = Number(configuracao.receitaMensal || 0);

  // Tetos máximos calculados em moedas
  const tetoFixos = receita * (configuracao.porcentagemFixos / 100);
  const tetoNaoEssenc = receita * (configuracao.porcentagemNaoEssenc / 100);
  const tetoInvest = receita * (configuracao.porcentagemInvest / 100);

  // Gastos atuais por pote
  const gastoFixos = Number(gastos.Fixo || 0);
  const gastoNaoEssenc = Number(gastos["Não Essencial"] || 0);
  const gastoInvest = Number(gastos.Investimento || 0);

  // Percentual de consumo de cada pote
  const pctFixos = tetoFixos > 0 ? (gastoFixos / tetoFixos) * 100 : 0;
  const pctNaoEssenc = tetoNaoEssenc > 0 ? (gastoNaoEssenc / tetoNaoEssenc) * 100 : 0;
  const pctInvest = tetoInvest > 0 ? (gastoInvest / tetoInvest) * 100 : 0;

  // Cálculo do saldo disponível restante no mês
  const saldoTotalRestante = receita - (gastoFixos + gastoNaoEssenc + gastoInvest);

  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <S.DashboardContainer>
      <S.ResumoSaldoCard>
        <h2>Sobrou para o Mês</h2>
        <p>{formatarMoeda(saldoTotalRestante)}</p>
      </S.ResumoSaldoCard>

      {/* Pote 1: Gastos Fixos */}
      <S.PoteCard>
        <S.PoteHeader>
          <span className="titulo">Gastos Fixos</span>
          <span className="valores">
            {formatarMoeda(gastoFixos)} de <span>{formatarMoeda(tetoFixos)}</span>
          </span>
        </S.PoteHeader>
        <S.ProgressBarContainer>
          <S.ProgressBarFill percent={pctFixos} />
        </S.ProgressBarContainer>
        <S.PercentLabel percent={pctFixos}>{pctFixos.toFixed(0)}% consumido</S.PercentLabel>
      </S.PoteCard>

      {/* Pote 2: Não Essenciais */}
      <S.PoteCard>
        <S.PoteHeader>
          <span className="titulo">Não Essenciais</span>
          <span className="valores">
            {formatarMoeda(gastoNaoEssenc)} de <span>{formatarMoeda(tetoNaoEssenc)}</span>
          </span>
        </S.PoteHeader>
        <S.ProgressBarContainer>
          <S.ProgressBarFill percent={pctNaoEssenc} />
        </S.ProgressBarContainer>
        <S.PercentLabel percent={pctNaoEssenc}>{pctNaoEssenc.toFixed(0)}% consumido</S.PercentLabel>
      </S.PoteCard>

      {/* Pote 3: Investimentos */}
      <S.PoteCard>
        <S.PoteHeader>
          <span className="titulo">Investimentos</span>
          <span className="valores">
            {formatarMoeda(gastoInvest)} de <span>{formatarMoeda(tetoInvest)}</span>
          </span>
        </S.PoteHeader>
        <S.ProgressBarContainer>
          <S.ProgressBarFill percent={pctInvest} />
        </S.ProgressBarContainer>
        <S.PercentLabel percent={pctInvest}>{pctInvest.toFixed(0)}% consumido</S.PercentLabel>
      </S.PoteCard>
    </S.DashboardContainer>
  );
}