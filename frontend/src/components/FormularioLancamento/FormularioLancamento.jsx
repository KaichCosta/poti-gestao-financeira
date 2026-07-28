import React, { useState } from 'react';
import * as S from './styles';
import { post } from '../../services/api';

export default function FormularioLancamento({ onSubmitExito, onErroFreemium }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]); // Auto-preenche com data atual
  const [metodoPagamento, setMetodoPagamento] = useState('Pix');
  const [tipoGasto, setTipoGasto] = useState('Não Essencial');

  const metodosDisponiveis = ['Pix', 'Crédito', 'Débito', 'Dinheiro'];
  const tiposGastoDisponiveis = ['Fixo', 'Não Essencial', 'Investimento'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descricao || !valor) {
      alert('Preencha a descrição e o valor da despesa.');
      return;
    }

    const payload = {
      descricao,
      valor: parseFloat(valor),
      data,
      metodoPagamento: metodoPagamento,
      tipoGasto: tipoGasto
    };

    try {
      const dataJson = await post('/transacoes', payload);

      // Sucesso no cadastro
      alert(dataJson.message || 'Lançamento salvo com sucesso!');
      setDescricao('');
      setValor('');
      
      // Essa função avisa o App.jsx para recarregar o Dashboard e encher a barrinha!
      if (onSubmitExito) onSubmitExito();

    } catch (err) {
      // Captura o erro da nossa Trava Freemium ou qualquer outro erro da API
      if (err.message === 'limite_atingido') {
        onErroFreemium('Você atingiu o limite de 30 lançamentos gratuitos deste mês. Desbloqueie lançamentos ilimitados no plano PRO!');
      } else {
        alert(err.message || 'Houve um erro ao salvar o lançamento.');
      }
    }
  };

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.FormGroup>
        <label>Descrição</label>
        <input 
          type="text" 
          placeholder="Ex: Aluguel, Mercado, Cinema..." 
          value={descricao} 
          onChange={(e) => setDescricao(e.target.value)}
        />
      </S.FormGroup>

      <S.FormGroup>
        <label>Valor (R$)</label>
        <input 
          type="number" 
          step="0.01" 
          placeholder="0,00" 
          value={valor} 
          onChange={(e) => setValor(e.target.value)}
        />
      </S.FormGroup>

      <S.FormGroup>
        <label>Data</label>
        <input 
          type="date" 
          value={data} 
          onChange={(e) => setData(e.target.value)}
        />
      </S.FormGroup>

      <S.FormGroup>
        <label>Método de Pagamento</label>
        <S.ChipGroup>
          {metodosDisponiveis.map((metodo) => (
            <S.Chip
              key={metodo}
              type="button"
              active={metodoPagamento === metodo}
              onClick={() => setMetodoPagamento(metodo)}
            >
              {metodo}
            </S.Chip>
          ))}
        </S.ChipGroup>
      </S.FormGroup>

      <S.FormGroup>
        <label>Pote / Tipo de Gasto</label>
        <S.ChipGroup>
          {tiposGastoDisponiveis.map((tipo) => (
            <S.Chip
              key={tipo}
              type="button"
              active={tipoGasto === tipo}
              onClick={() => setTipoGasto(tipo)}
            >
              {tipo}
            </S.Chip>
          ))}
        </S.ChipGroup>
      </S.FormGroup>

      <S.SubmitButton type="submit">Poti Guardar!</S.SubmitButton>
    </S.FormContainer>
  );
}