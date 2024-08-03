import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import PokemonCard from './PokeCard';
import Header from './Header';

interface Pokemon {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<any[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=60');
      setPokemons(response.data.results);
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const details = await Promise.all(
        pokemons.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: response.data.sprites.front_default,
          };
        })
      );
      setPokemonDetails(details);
    };

    if (pokemons.length > 0) {
      fetchPokemonDetails();
    }
  }, [pokemons]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
     <Header/>
      <main className="container mx-auto p-4 flex-grow pt-24 md:pt-28 lg:pt-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pokemonDetails.map((pokemon, index) => (
            <PokemonCard key={index} name={pokemon.name} image={pokemon.image} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
