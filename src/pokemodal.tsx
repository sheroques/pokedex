import React from 'react';

interface PokemonModalProps {
  pokemon: any;
  onClose: () => void;
}

const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <button onClick={onClose} className="mb-4 text-red-500">
          Fechar
        </button>
        <h2 className="text-2xl font-bold mb-4">{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mb-4" />
        <p><strong>Altura:</strong> {pokemon.height}</p>
        <p><strong>Peso:</strong> {pokemon.weight}</p>
        <p><strong>Experiencia base:</strong> {pokemon.base_experience}</p>
        <h3 className="text-xl font-bold mt-4">Habilidades</h3>
        <ul>
          {pokemon.abilities.map((ability: any, index: number) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mt-4">Status</h3>
        <ul>
          {pokemon.stats.map((stat: any, index: number) => (
            <li key={index}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonModal;
     

