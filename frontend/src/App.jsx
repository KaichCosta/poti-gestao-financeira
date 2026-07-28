import React, { useState } from 'react';
import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/Cadastro";
import { Onboarding } from './components/Onboarding/Onboarding';
import DashboardPotes from './components/Dashboard/DashboardPotes';
import FormularioLancamento from './components/FormularioLancamento/FormularioLancamento';
import { get } from './services/api';


function App() {
  // O estado inicial agora é 'carregando' para evitar piscar a tela de login no F5
  const[telaAtiva, setTelaAtiva] = useState('login')
  // Estados vazios que serão preenchidos pelo MySQL
  const [configuracao, setConfiguracao] = useState({});

  const [gastos, setGastos] = useState({});

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
        // Se tem token mas a config voltou vazia, manda pro Onboarding
        setTelaAtiva('onboarding');
      }
    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error);
      // Se o token estiver expirado ou inválido, limpa e manda logar de novo
      localStorage.removeItem('@Poti:token');
      setTelaAtiva('login');
    }
  };

  React.useEffect(() => {
    carregarDadosUsuario();
  }, []);

  //useEffect(() => {
  //  carregarDadosUsuario();
  //}, []);

  // 1. TELA DE CARREGAMENTO (Splash Screen)
  if (telaAtiva === 'carregando') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#E0FFEC', color: '#04261E', fontWeight: 'bold' }}>
        <p>Carregando seu Poti... 🫙</p>
      </div>
    );
  }

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
      logadoComSucesso={carregarDadosUsuario}
    />
  );
};

export default App;

