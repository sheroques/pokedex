import React from 'react';

interface PokemonCardProps {
  name: string;
  image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center bg-white hover:bg-gray-400">
      <img src={image} alt={name} className="h-24 w-24 mb-2" />
      <h2 className="text-xl font-semibold">{name}</h2>
    </div>
  );
};

export default PokemonCard;
