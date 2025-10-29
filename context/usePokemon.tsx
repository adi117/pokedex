"use client"

import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import axios from "axios";
import { Pokemon, PokemonContextType, PokemonListResponse } from "@/types/Pokemon";

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = useCallback(async (name: string) => {
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
  },[]);

  const fetchPokemons = useCallback(async(limit: number, offset: number) => {
    try {
      setLoading(true)
      setError(null)
      const res = await axios.get<PokemonListResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)

      const pokemonDetails = await Promise.all(
        res.data.results.map(async(p) => {
          const details = await axios.get<Pokemon>(p.url);
          return details.data;
        })
      )

      setPokemons(pokemonDetails);
    } catch (err) {
      setError("Failed to fetch Pokémon list");
      console.error(err);
    } finally {
      setLoading(false);
    }
  },[])

  return (
    <PokemonContext.Provider value={{ pokemon, pokemons, loading, error, fetchPokemon, fetchPokemons }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) throw new Error("usePokemon must be used within PokemonProvider");
  return context;
};
