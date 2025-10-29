"use client"

import { usePokemon } from "@/hooks/usePokemonHooks";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const { pokemon, fetchPokemon } = usePokemon();
  const [pokemonName, setPokemonName] = useState("");

  const handleSearch = () => {
    fetchPokemon(pokemonName)
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <input
        type="text"
        placeholder="Enter Pokémon name..."
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      <div>
        {pokemon &&
          <p>{pokemon.name}</p>
        }
      </div>
    </div>
  );
}
