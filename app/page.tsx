"use client"

import { usePokemon } from "@/context/usePokemon";
import Image from "next/image";
import { useState } from "react";

const typeColors: Record<string, string> = {
  normal: 'bg-[#A8A77A]',
  fire: 'bg-[#EE8130]',
  water: 'bg-[#6390F0]',
  electric: 'bg-[#F7D02C]',
  grass: 'bg-[#7AC74C]',
  ice: 'bg-[#96D9D6]',
  fighting: 'bg-[#C22E28]',
  poison: 'bg-[#A33EA1]',
  ground: 'bg-[#E2BF65]',
  flying: 'bg-[#A98FF3]',
  psychic: 'bg-[#F95587]',
  bug: 'bg-[#A6B91A]',
  rock: 'bg-[#B6A136]',
  ghost: 'bg-[#735797]',
  dragon: 'bg-[#6F35FC]',
  dark: 'bg-[#705746]',
  steel: 'bg-[#B7B7CE]',
  fairy: 'bg-[#D685AD]',
};

export default function Home() {
  const { pokemons, fetchPokemons } = usePokemon();
  const [pokemonName, setPokemonName] = useState("");

  const handleSearch = () => {
    fetchPokemons(20, 0)
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans">
      <div className="grid grid-cols-4 gap-5 w-full justify-between items-center text-center">
        {pokemons?.map((pokemon) => (
          <div key={pokemon.name} className="flex flex-col items-center bg-white shadow-2xs rounded-2xl p-5">
            <Image
              src={pokemon.sprites.front_default ?? 'https://placehold.co/400'}
              alt={pokemon.name + ' sprites'}
              width={100}
              height={100}
            />
            <p className="text-black capitalize">{pokemon.name}</p>
            <div className="flex gap-2 w-full items-center justify-center">
              {pokemon.types.map((type) => (
                <div key={type.type.name}>
                  <p className={`text-sm capitalize p-1 rounded-sm ${typeColors[type.type.name] ?? "bg-gray-300"}`}>{type.type.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
