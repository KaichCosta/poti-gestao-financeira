import React, { useState } from 'react';
import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/Cadastro";

function App() {
  const[telaAtiva, setTelaAtiva] = useState('login')

  if (telaAtiva === 'login') {
    return <Cadastro irParaLogin={() => setTelaAtiva('login')} />
  }
  
  return <Login irParaCadastro={() => setTelaAtiva('cadastro')} />
}

export default App;