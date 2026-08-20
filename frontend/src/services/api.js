const API_URL = import.meta.env.VITE_API_URL;

// Função utilitária para centralizar as requisições POST do app.
export async function post(endpoint, dados) {
    const token = localStorage.getItem('@Poti:token');

    const cabeçalhos = {
        'Content-Type': 'application/json'
    };

    // Se o usuário tiver um token (estiver logado), injeta no padrão Bearer
    if (token) {
        cabeçalhos['Authorization'] = `Bearer ${token}`;
    }

    const resposta = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: cabeçalhos,
        body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
        throw new Error(resultado.erro || resultado.error || 'Erro na requisição.');
    }

    return resultado;
}

export async function get(endpoint) {
    const token = localStorage.getItem('@Poti:token');

    const cabeçalhos = {
        'Content-Type': 'application/json'
    };

    if (token) {
        cabeçalhos['Authorization'] = `Bearer ${token}`;
    }

    const resposta = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: cabeçalhos

    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
        throw new Error(resultado.erro || resultado.error || 'Erro na requisição GET.');
    }

    return resultado;
}