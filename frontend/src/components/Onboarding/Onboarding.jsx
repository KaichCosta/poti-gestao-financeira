import React, { useState } from 'react';
import { post } from '../../services/api';
import * as C from './styles';

export function Onboarding() {
  const [passo, setPasso] = useState(1);
  const [receitaMensal, setReceitaMensal] = useState('');
  const [porcentagemFixos, setPorcentagemFixos] = useState(50);
  const [porcentagemNaoEssenc, setPorcentagemNaoEssenc] = useState(30);
  const [porcentagemInvest, setPorcentagemInvest] = useState(20);
  const [diaResetOrcamento, setDiaResetOrcamento] = useState(5);
  const [carregando, setCarregando] = useState(false);

  const somaDasPorcentagens = Number(porcentagemFixos) + Number(porcentagemNaoEssenc) + Number(porcentagemInvest);
  const totalEhValido = somaDasPorcentagens === 100;

  const lidarComEnvio = async (e) => {
    e.preventDefault();
    if (!totalEhValido && passo === 2) return;

    if (passo < 3) {
      setPasso(passo + 1);
      return;
    }

    setCarregando(true);
    try {
      const token = localStorage.getItem('@Poti:token');
      
      await post('/configuracao', {
        receitaMensal: parseFloat(receitaMensal),
        porcentagemFixos: Number(porcentagemFixos),
        porcentagemNaoEssenc: Number(porcentagemNaoEssenc),
        porcentagemInvest: Number(porcentagemInvest),
        diaResetOrcamento: Number(diaResetOrcamento)
    
      });
      alert('Configurações ativadas com sucesso! 🫙');

      if (irParaDashboard) {
        irParaDashboard();
      }
    } catch (error) {
      alert(error.response?.data?.erro || 'Erro interno ao salvar suas configurações.');
    } finally {
      setCarregando(false);
    }
  };

  // Calcula a largura da barra de progresso baseada nas 3 etapas
  const larguraProgresso = `${(passo / 3) * 100}%`;

  return (
    <C.Container>
      <C.ProgressBarContainer>
        <C.ProgressBar width={larguraProgresso} />
      </C.ProgressBarContainer>

      <C.Card as="form" onSubmit={lidarComEnvio}>
        {passo === 1 && (
          <>
            <h2>Qual sua receita mensal?</h2>
            <p>Informe seu salário livre ou ganhos médios fixos. Usaremos esse valor como o teto para distribuir entre seus Potes.</p>
            <C.Group>
              <C.Input 
                type="number"
                step="0.01"
                placeholder="R$ 0,00"
                required
                value={receitaMensal}
                onChange={(e) => setReceitaMensal(e.target.value)}
              />
            </C.Group>
            <C.Button type="submit" disabled={!receitaMensal || receitaMensal <= 0}>
              Avançar →
            </C.Button>
          </>
        )}

        {passo === 2 && (
          <>
            <h2>Configure seus Potes</h2>
            <p>Distribua o seu orçamento mensal de acordo com suas metas. A soma dos potes precisa atingir exatamente 100%.</p>
            
            <C.Group>
              <label color="#E7390D">Gastos Fixos (%)</label>
              <C.Input 
                type="number" 
                borderColor="#E7390D"
                min="0"
                max="100"
                value={porcentagemFixos}
                onChange={(e) => setPorcentagemFixos(e.target.value)}
              />
            </C.Group>

            <C.Group>
              <label color="#F26716">Estilo de Vida (%)</label>
              <C.Input 
                type="number" 
                borderColor="#F26716"
                min="0"
                max="100"
                value={porcentagemNaoEssenc}
                onChange={(e) => setPorcentagemNaoEssenc(e.target.value)}
              />
            </C.Group>

            <C.Group>
              <label color="#084A24">Investimentos (%)</label>
              <C.Input 
                type="number" 
                borderColor="#084A24"
                min="0"
                max="100"
                value={porcentagemInvest}
                onChange={(e) => setPorcentagemInvest(e.target.value)}
              />
            </C.Group>

            <C.BadgeValidacao isValid={totalEhValido}>
              Distribuição total: {somaDasPorcentagens}% {totalEhValido ? '✅' : '❌ (Ajuste para 100%)'}
            </C.BadgeValidacao>

            <C.Button type="submit" disabled={!totalEhValido}>
              Confirmar Distribuição →
            </C.Button>
          </>
        )}

        {passo === 3 && (
          <>
            <h2>Dia da Virada 🫙</h2>
            <p>Escolha o dia em que o seu app deve zerar os gastos acumulados do mês e resetar as barras dos Potes (geralmente o dia do seu pagamento).</p>
            <C.Group>
              <C.Input 
                type="number"
                min="1"
                max="31"
                required
                value={diaResetOrcamento}
                onChange={(e) => setDiaResetOrcamento(e.target.value)}
              />
            </C.Group>
            <C.Button type="submit" disabled={carregando}>
              {carregando ? 'Salvando...' : 'Ativar Meu Poti 🫙'}
            </C.Button>
          </>
        )}
      </C.Card>
    </C.Container>
  );
}