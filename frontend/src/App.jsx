import React, { useState } from 'react';
import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/Cadastro";
import { Onboarding } from './components/Onboarding/onboarding';

function App() {
  const[telaAtiva, setTelaAtiva] = useState('login')

  if (telaAtiva === 'cadastro') {
    return <Cadastro irParaLogin={() => setTelaAtiva('login')} />
  }

  if (telaAtiva === 'onboarding') {
    return <Onboarding />;
  }
  
  return (
    <Login
      irParaCadastro={() => setTelaAtiva('cadastro')}
      logadoComSucesso={() => setTelaAtiva('onboarding')}
    />
  );
};

export default App;