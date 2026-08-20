const API_URL = import.meta.env.VITE_API_URL;

// Função utilitária para centralizar as requisições POST do app.
export async function post(endpoint, dados) {
    // Busca o token guardado no navegador no momento do login
    const token = localStorage.getItem('@Poti:token');

    // Monta os cabeçalhos padrões da requisição
    const cabeçalhos = {
        'Content-Type': 'application/json'
    };

    // Se o usuário tiver um token (estiver logado), injeta no padrão Bearer
    if (token) {
        cabeçalhos['Authorization'] = `Bearer ${token}`;
    }

    const resposta = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: cabeçalhos, // Usa os cabeçalhos dinâmicos
        body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
        // Ajustado de resultado.error para resultado.erro (padrão que criamos no express)
        throw new Error(resultado.erro || resultado.error || 'Erro na requisição.');
    }

    return resultado;
}

export async function get(endpoint) {
    // Busca o token guardado no navegador
    const token = localStorage.getItem('@Poti:token');

    // Monta os cabeçalhos padrões da requisição
    const cabeçalhos = {
        'Content-Type': 'application/json'
    };

    // O "Pulo do Gato": Injeta o token automaticamente no GET também!
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