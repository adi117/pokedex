"use client"

import { usePokemon } from "@/context/usePokemon";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  const { pokemons, fetchPokemons, loading } = usePokemon();
  const [pokemonName, setPokemonName] = useState("");
  const [page, setPage] = useState(0);
  const limit = 20;

  useEffect(() => {
    fetchPokemons(limit, page * limit);
  }, [page, fetchPokemons]);

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-10 min-h-screen items-center justify-center bg-background font-sans m-10">
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

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={page === 0 || loading}
          className={`px-3 py-1 rounded-lg text-white ${
            page === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-700 font-medium">Page {page + 1}</span>

        <button
          onClick={handleNext}
          disabled={loading}
          className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
