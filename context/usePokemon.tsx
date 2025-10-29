"use client"

import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import axios from "axios";
import { Pokemon, PokemonContextType, PokemonListResponse, PokemonSpecies } from "@/types/Pokemon";

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(null);
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const fetchPokemon = useCallback(async (name: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);

      const speciesRes = await axios.get<PokemonSpecies>(res.data.species.url);

      setPokemon(res.data);
      setDisplayedPokemons([res.data]);
      setPokemonSpecies(speciesRes.data);
    } catch (err) {
      setError("Failed to fetch Pokémon data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPokemons = useCallback(async (limit: number, offset: number) => {
    try {
      setLoading(true)
      setError(null)
      const res = await axios.get<PokemonListResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)

      const pokemonDetails = await Promise.all(
        res.data.results.map(async (p) => {
          const details = await axios.get<Pokemon>(p.url);
          return details.data;
        })
      )

      setPokemons(pokemonDetails);
      setDisplayedPokemons(pokemonDetails)
    } catch (err) {
      setError("Failed to fetch Pokémon list");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [])

  return (
    <PokemonContext.Provider value={{ pokemon, pokemons, displayedPokemons, loading, error, fetchPokemon, fetchPokemons, pokemonSpecies, initialized, setInitialized }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) throw new Error("usePokemon must be used within PokemonProvider");
  return context;
};
