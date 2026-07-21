import React, { useState } from 'react';
import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/Cadastro";
import { Onboarding } from './components/Onboarding/Onboarding';
import DashboardPotes from './components/Dashboard/DashboardPotes';
import FormularioLancamento from './components/FormularioLancamento/FormularioLancamento';

function App() {
  const[telaAtiva, setTelaAtiva] = useState('login')

  const [configuracao] = useState({
    receitaMensal: 3000,
    porcentagemFixos: 50,
    porcentagemNaoEssenc: 30,
    porcentagemInvest: 20
  });

  const [gastos, setGastos] = useState({
    Fixo: 0,
    "Não Essencial": 0,
    Investimento: 0
  });

  if (telaAtiva === 'cadastro') {
    return <Cadastro irParaLogin={() => setTelaAtiva('login')} />
  }

  if (telaAtiva === 'onboarding') {
    return <Onboarding irParaDashboard={() => setTelaAtiva('dashboard')}/>;
  }
  
  if (telaAtiva === 'dashboard') {
    return (
      <div style={{ paddingBottom: '2rem' }}>
        <DashboardPotes configuracao={configuracao} gastos={gastos} />
        <FormularioLancamento 
          onSubmitExito={() => {
            // Lógica para recarregar ou atualizar os gastos na tela após um lançamento
          }}
          onErroFreemium={(mensagem) => {
            alert(mensagem);
          }}
        />
      </div>
    );
  }

  return (
    <Login
      irParaCadastro={() => setTelaAtiva('cadastro')}
      logadoComSucesso={() => setTelaAtiva('onboarding')}
    />
  );
};

export default App;

