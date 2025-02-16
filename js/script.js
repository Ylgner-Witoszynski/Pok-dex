// Seleciona os elementos do DOM que serão utilizados
const pokemonName = document.querySelector('.pokemon__name'); // Elemento que exibe o nome do Pokémon
const pokemonNumber = document.querySelector('.pokemon__number'); // Elemento que exibe o número do Pokémon
const pokemonImage = document.querySelector('.pokemon__image'); // Elemento que exibe a imagem do Pokémon

const form = document.querySelector('.form'); // Seleciona o formulário de busca
const input = document.querySelector('.input__search'); // Seleciona o campo de entrada de busca
const buttonPrev = document.querySelector('.btn-prev'); // Botão para buscar o Pokémon anterior
const buttonNext = document.querySelector('.btn-next'); // Botão para buscar o próximo Pokémon

let searchPokemon = 1; // Inicializa a variável para armazenar o ID do Pokémon a ser buscado

// Função assíncrona para buscar dados do Pokémon na API
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`); // Faz a requisição à API

  if (APIResponse.status === 200) { // Verifica se a resposta da API foi bem-sucedida
    const data = await APIResponse.json(); // Converte a resposta em JSON
    return data; // Retorna os dados do Pokémon
  }
}

// Função assíncrona para renderizar os dados do Pokémon na interface
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...'; // Exibe mensagem de carregamento
  pokemonNumber.innerHTML = ''; // Limpa o número do Pokémon

  const data = await fetchPokemon(pokemon); // Busca os dados do Pokémon

  if (data) { // Se os dados foram encontrados
    pokemonImage.style.display = 'block'; // Exibe a imagem do Pokémon
    pokemonName.innerHTML = data.name; // Atualiza o nome do Pokémon
    pokemonNumber.innerHTML = data.id; // Atualiza o número do Pokémon
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; // Define a imagem do Pokémon
    /* Nesta linha acima apresenta um erro de exibição, ela so tem animações até o nº649, para corrigir isto use 
    pokemonImage.src = data['sprites']['other']['home']['front_default'];
    as animções ficaam em 3D*/
    input.value = ''; // Limpa o campo de entrada
    searchPokemon = data.id; // Atualiza o ID do Pokémon buscado
  } else { // Se os dados não foram encontrados
    pokemonImage.style.display = 'none'; // Esconde a imagem do Pokémon
    pokemonName.innerHTML = 'Not found :c'; // Exibe mensagem de não encontrado
    pokemonNumber.innerHTML = ''; // Limpa o número do Pokémon
  }
}

// Adiciona um evento de submit ao formulário
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Previne o comportamento padrão do formulário
  renderPokemon(input.value.toLowerCase()); // Renderiza o Pokémon com o nome inserido
});

// Adiciona um evento de clique ao botão anterior
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) { // Verifica se o ID do Pokémon é maior que 1
    searchPokemon -= 1; // Decrementa o ID do Pokémon
    renderPokemon(searchPokemon); // Renderiza o Pokémon anterior
  }
});

// Adiciona um evento de clique ao botão próximo
buttonNext.addEventListener('click', () => {
  searchPokemon += 1; // Incrementa o ID do Pokémon
  renderPokemon(searchPokemon); // Renderiza o próximo Pokémon
});

// Renderiza o Pokémon inicial ao carregar a página
renderPokemon(searchPokemon);