export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };
}

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[]
}


export interface PokemonContextType {
  pokemon: Pokemon | null;
  pokemons: Pokemon[] | null;
  loading: boolean;
  error: string | null;
  fetchPokemon: (name: string) => Promise<void>;
  fetchPokemons: (limit: number, offset: number) => Promise<void>;
}