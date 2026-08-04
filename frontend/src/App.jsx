import React, { useState } from 'react';
import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/Cadastro";
import { Onboarding } from './components/Onboarding/Onboarding';
import DashboardPotes from './components/Dashboard/DashboardPotes';
import FormularioLancamento from './components/FormularioLancamento/FormularioLancamento';
import { get } from './services/api';
import ModalFreemium from './components/ModalFreemium/ModalFreemium';
import Historico from './components/Historico/Historico';
import MenuNavegacao from './components/MenuNavegacao/MenuNavegacao';

function App() {
  const[telaAtiva, setTelaAtiva] = useState('carregando')

  const [configuracao, setConfiguracao] = useState({});
  const [gastos, setGastos] = useState({});
  const [modalFreemiumAberto, setModalFreemiumAberto] = useState(false);

  const carregarDadosUsuario = async () => {
    const token = localStorage.getItem('@Poti:token'); // Pega o token que você salvou no Login

    if (!token) {
      setTelaAtiva('login');
      return;
    }

    try {
      // Chama a rota Sênior com GROUP BY que criamos no backend
      const resposta = await get('/dashboard');

      // Se a API retornou configuração, o usuário já fez o Onboarding
      if (resposta && resposta.configuracao) {
        setConfiguracao(resposta.configuracao);
        setGastos(resposta.gastos || {});
        setTelaAtiva('dashboard');
      } else {
        setTelaAtiva('onboarding');
      }
    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error);
      localStorage.removeItem('@Poti:token');
      setTelaAtiva('login');
    }
  };

  React.useEffect(() => {
    carregarDadosUsuario();
  }, []);

  // 1. TELA DE CARREGAMENTO (Splash Screen)
  if (telaAtiva === 'carregando') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#E0FFEC', color: '#04261E', fontWeight: 'bold' }}>
        <p>Carregando seu Poti... 🫙</p>
      </div>
    );
  }

  if (telaAtiva === 'login') {
    return (<Login irParaCadastro={() => setTelaAtiva('cadastro')} onLoginSucesso={carregarDadosUsuario} />);
  }

  if (telaAtiva === 'cadastro') {
    return <Cadastro irParaLogin={() => setTelaAtiva('login')} />
  }

  if (telaAtiva === 'onboarding') {
    return <Onboarding irParaDashboard={() => setTelaAtiva('dashboard')}/>;
  }
  
  return (
    <div style={{ paddingBottom: '80px', minHeight: '100vh' }}>
      
      {/* TELA DASHBOARD (Potes + Lançamento) */}
      {telaAtiva === 'dashboard' && (
        <>
          <DashboardPotes configuracao={configuracao} gastos={gastos} />
          <FormularioLancamento 
            onSubmitExito={carregarDadosUsuario}
            onErroFreemium={() => setModalFreemiumAberto(true)}
          />
          <ModalFreemium
            isOpen={modalFreemiumAberto} 
            onClose={() => setModalFreemiumAberto(false)} 
          />
        </>
      )}

      {/* TELA HISTÓRICO / EXTRATO */}
      {telaAtiva === 'historico' && (
        <Historico />
      )}

      {/* TELA DE CONFIGURAÇÕES / AJUSTES */}
      {telaAtiva === 'configuracoes' && (
        <Onboarding irParaDashboard={() => setTelaAtiva('dashboard')} />
      )}

      {/* RODAPÉ FIXO COM BOTTOM NAVIGATION BAR */}
      <MenuNavegacao 
        telaAtiva={telaAtiva} 
        setTelaAtiva={setTelaAtiva} 
      />

    </div>
  );
}

export default App;

