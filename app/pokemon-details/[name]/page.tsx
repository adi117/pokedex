"use client"

import { usePokemon } from "@/context/usePokemon";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function PokemonDetailsPage() {
  const { name } = useParams();

  const { pokemon, fetchPokemon } = usePokemon();

  useEffect(() => {
    if (name) fetchPokemon(name.toString())
  }, [name, fetchPokemon])

  if (!pokemon) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-gray-600">Loading Pokémon details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
      <Image
        src={pokemon.sprites?.front_default ?? "https://placehold.co/200"}
        alt={pokemon.name}
        width={100}
        height={100}
        className="w-40 h-40 my-4"
      />
      <div className="flex gap-2">
        {pokemon.types?.map((type) => (
          <p
            key={type.type.name}
            className="capitalize bg-gray-200 rounded-md px-2 py-1"
          >
            {type.type.name}
          </p>
        ))}
      </div>
    </div>
  );
}
