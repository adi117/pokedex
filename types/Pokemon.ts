export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    back_default: string | null;
    back_shiny: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
        front_shiny: string | null;
      };
      home?: {
        front_default: string | null;
        front_shiny: string | null;
      };
      dream_world?: {
        front_default: string | null;
      };
    };
  };
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
  species: {
    name: string;
    url: string;
  };
  game_indices: {
    game_index: number;
    version: {
      name: string;
    };
  }[];
}

export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version: {
      name: string;
    };
  }[];
  genera: {
    genus: string;
    language: {
      name: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
  habitat: {
    name: string;
  } | null;
  color: {
    name: string;
  };
  shape: {
    name: string;
  };
  generation: {
    name: string;
  };
  egg_groups: {
    name: string;
  }[];
  capture_rate: number;
  base_happiness: number;
  growth_rate: {
    name: string;
  };
  gender_rate: number;
}

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonContextType {
  pokemon: Pokemon | null;
  pokemonSpecies: PokemonSpecies | null;
  pokemons: Pokemon[] | null;
  displayedPokemons: Pokemon[] | null;
  loading: boolean;
  error: string | null;
  fetchPokemon: (name: string) => Promise<void>;
  fetchPokemons: (limit: number, offset: number) => Promise<void>;
}