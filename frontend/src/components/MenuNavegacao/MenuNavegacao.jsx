import React from "react";
import * as C from "./styles";
import { FiPieChart, FiList, FiSettings } from "react-icons/fi";

const MenuNavegacao = ({ telaAtiva, setTelaAtiva }) => {
  return (
    <C.NavContainer>
      <C.NavItem
        $ativo={telaAtiva === "dashboard"}
        onClick={() => setTelaAtiva("dashboard")}
      >
        <FiPieChart />
        <span>Potes</span>
      </C.NavItem>

      <C.NavItem
        $ativo={telaAtiva === "historico"}
        onClick={() => setTelaAtiva("historico")}
      >
        <FiList />
        <span>Histórico</span>
      </C.NavItem>

      <C.NavItem
        $ativo={telaAtiva === "ajustes"}
        onClick={() => setTelaAtiva("ajustes")}
      >
        <FiSettings />
        <span>Ajustes</span>
      </C.NavItem>
    </C.NavContainer>
  );
};

export default MenuNavegacao;
