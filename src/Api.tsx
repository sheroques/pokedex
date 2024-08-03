import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon?limit=60&offset=0',
});

export const getPokemons = async (limit: number = 20) => {
  const response = await api.get(`pokemon?limit=${limit}`);
  return response.data.results;
};

export const getPokemonDetails = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
