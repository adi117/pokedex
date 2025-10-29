"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Pokemon } from "@/types/Pokemon";

interface PokemonContextType {
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
  fetchPokemon: (name: string) => Promise<void>;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = async (name: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemon(res.data);
    } catch (err) {
      setError("Failed to fetch Pokémon data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon("ditto");
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemon, loading, error, fetchPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) throw new Error("usePokemon must be used within PokemonProvider");
  return context;
};
