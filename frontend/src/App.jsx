import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/Cadastro";
import { Onboarding } from './components/Onboarding/Onboarding';
import DashboardPotes from './components/Dashboard/DashboardPotes';
import FormularioLancamento from './components/FormularioLancamento/FormularioLancamento';
import { get } from './services/api';
import ModalFreemium from './components/ModalFreemium/ModalFreemium';
import Historico from './components/Historico/Historico';
import MenuNavegacao from './components/MenuNavegacao/MenuNavegacao';
import { Ajustes } from './components/Ajustes/Ajustes';

function App() {
  const[telaAtiva, setTelaAtiva] = useState('carregando')

  const [configuracao, setConfiguracao] = useState({});
  const [gastos, setGastos] = useState({});
  const [modalFreemiumAberto, setModalFreemiumAberto] = useState(false);

  const carregarDadosUsuario = async () => {
    const token = localStorage.getItem('@Poti:token');

    if (!token) {
      setTelaAtiva('login');
      return;
    }

    try {
      const resposta = await get('/dashboard');

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

  const lidarComLogout = () => {

    localStorage.removeItem('@Poti:token'); 
    toast.success('Sessão encerrada com sucesso.');
    setTelaAtiva('login');
  };

  return (
    <>
      {/* 1. O TOASTER FICA NO TOPO DE TUDO! SEMPRE RENDERIZADO */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#FAFAFA',
            color: '#04261E',
            fontWeight: '600',
            border: '1px solid #084A24',
          },
          success: {
            iconTheme: { primary: '#084A24', secondary: '#E0FFEC' },
          },
          error: {
            iconTheme: { primary: '#E7390D', secondary: '#E0FFEC' },
          },
        }}
      />

      {telaAtiva === 'carregando' && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#E0FFEC', color: '#04261E', fontWeight: 'bold' }}>
          <p>Carregando seu Poti... 🫙</p>
        </div>
      )}

      {telaAtiva === 'login' && (
        <Login irParaCadastro={() => setTelaAtiva('cadastro')} onLoginSucesso={carregarDadosUsuario} />
      )}

      {telaAtiva === 'cadastro' && (
        <Cadastro irParaLogin={() => setTelaAtiva('login')} />
      )}

      {telaAtiva === 'onboarding' && (
        <Onboarding irParaDashboard={() => setTelaAtiva('dashboard')}
          configuracaoAtual={configuracao}
          aoSalvar={carregarDadosUsuario}
        />
      )}  

      {/* 3. ÁREA LOGADA (Dashboard, Histórico, Ajustes) */}
      {['dashboard', 'historico', 'ajustes'].includes(telaAtiva) && (
        <div style={{ paddingBottom: '80px', minHeight: '100vh' }}>
          
          {telaAtiva === 'dashboard' && (
            <>
              <DashboardPotes ajustes={configuracao} gastos={gastos} />
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

          {telaAtiva === 'historico' && <Historico />}

          {telaAtiva === 'ajustes' && (
            <Ajustes
              onLogout={lidarComLogout}
              onEditarOrcamento={() => setTelaAtiva('onboarding')}
            />
          )}

          <MenuNavegacao telaAtiva={telaAtiva} setTelaAtiva={setTelaAtiva} />
        </div>
      )}
    </>
  );
}

export default App;