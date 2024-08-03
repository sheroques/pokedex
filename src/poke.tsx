

export interface PokemonAbility {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }
  
  export interface PokemonType {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }
  
  export interface Pokemon {
    name: string;
    id: number;
    abilities: PokemonAbility[];
    types: PokemonType[];
    sprites: {
      front_default: string;
    };
  }
  