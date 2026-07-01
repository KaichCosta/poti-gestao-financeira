const API_URL = 'http://localhost:3000/api';

// Função utilitária sênior para centralizar as requisições POST do app.
export async function post(endpoint, dados) {
    const resposta = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
        throw new Error(resultado.error || 'Erro na requisição.');
    }

    return resultado;
}
