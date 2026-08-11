import { MdHomeFilled, MdShoppingBag, MdTrendingUp } from 'react-icons/md';

// Mapeamento centralizado das propriedades visuais dos potes
export const POTES_UI = {
  fixos: {
    nome: "Gastos Fixos",
    icone: <MdHomeFilled size={24} />,
    cor: "#E7390D" //
  },
  nao_essenciais: {
    nome: "Não Essenciais",
    icone: <MdShoppingBag size={24} />,
    cor: "#F26716" //
  },
  investimentos: {
    nome: "Investimentos",
    icone: <MdTrendingUp size={24} />,
    cor: "#084A24"
  }
};