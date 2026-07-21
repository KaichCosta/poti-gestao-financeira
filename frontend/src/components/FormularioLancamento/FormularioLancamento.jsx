import React, { useState } from 'react';
import * as S from './styles';

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
      metodo_pagamento: metodoPagamento,
      tipo_gasto: tipoGasto
    };

    try {
      const response = await fetch('/api/transacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Certifica de enviar JWT
        },
        body: JSON.stringify(payload)
      });

      const dataJson = await response.json();

      if (response.status === 403 && dataJson.error === 'limite_atingido') {
        // Envia para o handler do componente pai exibir o Modal de Upgrade para o plano PRO
        onErroFreemium(dataJson.message);
        return;
      }

      if (!response.ok) {
        throw new Error(dataJson.error || 'Erro desconhecido');
      }

      // Sucesso no cadastro
      alert(dataJson.message);
      setDescricao('');
      setValor('');
      if (onSubmitExito) onSubmitExito();

    } catch (err) {
      alert(err.message || 'Houve um erro ao salvar o lançamento.');
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