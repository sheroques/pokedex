import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import PokemonCard from './PokeCard';
import Header from './Header';
import PokemonModal from './pokemodal';


interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  name: string;
  image: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonDetails[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=60`);
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
      setFilteredPokemons(details);
    };

    if (pokemons.length > 0) {
      fetchPokemonDetails();
    }
  }, [pokemons]);

  const handleSearch = async (query: string) => {
    if (query === "") {
      setFilteredPokemons(pokemonDetails);
    } else {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
        const pokemon = {
          name: response.data.name,
          image: response.data.sprites.front_default,
        };
        setFilteredPokemons([pokemon]);
      } catch (error) {
        console.error('Pokemon not found');
        setFilteredPokemons([]);
      }
    }
  };
  const handlePokemonClick = async (name: string) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    setSelectedPokemon(response.data);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header onSearch={handleSearch} />
      <main className="container mx-auto p-4 flex-grow pt-24 md:pt-28 lg:pt-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPokemons.map((pokemon, index) => (
            <div key={index} onClick={() => handlePokemonClick(pokemon.name)}>
            <PokemonCard name={pokemon.name} image={pokemon.image} />
          </div>
          ))}
        </div>
      </main>
      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
