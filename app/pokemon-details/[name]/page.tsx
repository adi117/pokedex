"use client"

import { usePokemon } from "@/context/usePokemon";
import { typeColors } from "@/types/Utils";
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
    <div className="flex flex-row items-center justify-center min-h-screen text-center w-screen px-10">
      <div className="w-1/2 h-screen">
        <div className="flex flex-col gap-2 items-start justify-center">
          <div className="flex gap-3">
            <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
            <h2 className="text-2xl text-foreground/50">#{pokemon.id}</h2>
          </div>
          <div className="flex gap-2 w-fit items-center justify-center">
            {pokemon.types.map((type) => (
              <div key={type.type.name}>
                <p className={`text-sm capitalize p-1 rounded-sm ${typeColors[type.type.name] ?? "bg-gray-300"}`}>{type.type.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-full">
          <Image
            src={pokemon.sprites?.front_default ?? "https://placehold.co/200"}
            alt={pokemon.name}
            width={400}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>

        <div>
        </div>
      </div>

      <div className="w-1/2 h-screen">
        <div className="flex flex-col gap-5">
          {/* Physical */}
          <div className="flex flex-col gap-2 items-start justify-start">
            <h2 className="font-semibold">Physical</h2>
            <div className="w-full">
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-2 border border-gray-200 rounded-xl w-full py-2">
                  <p className="font-semibold">Height</p>
                  <p>{pokemon.height}</p>
                </div>
                <div className="flex flex-col gap-2 border border-gray-200 rounded-xl w-full py-2">
                  <p className="font-semibold">Weight</p>
                  <p>{pokemon.weight}</p>
                </div>
                <div className="flex flex-col gap-2 border border-gray-200 rounded-xl w-full py-2">
                  <p className="font-semibold">Moves</p>
                  <p>{pokemon.moves.length}</p>
                </div>
                <div className="flex flex-col gap-2 border border-gray-200 rounded-xl w-full py-2">
                  <p className="font-semibold">Base Exp.</p>
                  <p>{pokemon.base_experience}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Abilities */}
          <div className="flex flex-col gap-2 items-start justify-start">
            <h2 className="font-semibold">Physical</h2>
            <div className="w-full">
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-2 border border-gray-200 rounded-xl w-full py-2">
                  <p className="font-semibold">Height</p>
                  <p>{pokemon.height}</p>
                </div>
                <div className="flex flex-col gap-2 border border-gray-200 rounded-xl w-full py-2">
                  <p className="font-semibold">Weight</p>
                  <p>{pokemon.weight}</p>
                </div>
                <div className="flex flex-col gap-2 border border-gray-200 rounded-xl w-full py-2">
                  <p className="font-semibold">Moves</p>
                  <p>{pokemon.moves.length}</p>
                </div>
                <div className="flex flex-col gap-2 border border-gray-200 rounded-xl w-full py-2">
                  <p className="font-semibold">Base Exp.</p>
                  <p>{pokemon.base_experience}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-2 items-start justify-start">
            <h2 className="font-semibold">Stats</h2>
            <div className="w-full">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="flex items-center gap-3 mb-2">
                  <p className="w-32 text-sm text-left font-medium capitalize text-gray-700">
                    {stat.stat.name.replace('-', ' ')}
                  </p>
                  <p className="w-10 text-sm font-semibold text-gray-800">
                    {stat.base_stat}
                  </p>
                  <div className="flex-1 bg-gray-200 rounded-full h-1 overflow-hidden">
                    <div
                      className="bg-green-300 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
