"use client"

import { usePokemon } from "@/context/usePokemon";
import { typeColors } from "@/types/Utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function PokemonDetailsPage() {
  const { name } = useParams();
  const { pokemon, pokemonSpecies, fetchPokemon } = usePokemon();

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

  const description = pokemonSpecies?.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  )?.flavor_text.replace(/\f/g, " ") ?? "";

  const genus = pokemonSpecies?.genera.find(
    (g) => g.language.name === "en"
  )?.genus ?? "";

  const statColors: { [key: string]: string } = {
    hp: "bg-red-500",
    attack: "bg-orange-500",
    defense: "bg-yellow-500",
    "special-attack": "bg-blue-500",
    "special-defense": "bg-green-500",
    speed: "bg-pink-500",
  };

  return (
    <div className="flex flex-col w-full px-10 lg:px-20">
      {/* Navigation */}
      <div className="w-full py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-semibold">Back to Pokédex</span>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen text-center gap-16 w-full">
        <div className="w-full md:w-1/2 h-fit md:h-screen flex flex-col justify-center">
          <div className="flex flex-col gap-2 items-start justify-center mb-6">
            <div className="flex gap-3 items-baseline">
              <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
              <h2 className="text-2xl text-foreground/50">#{String(pokemon.id).padStart(3, '0')}</h2>
            </div>
            {genus && <p className="text-lg text-gray-600 font-medium">{genus}</p>}
            <div className="flex gap-2 w-fit items-center justify-center mt-2">
              {pokemon.types.map((type) => (
                <div key={type.type.name}>
                  <p className={`text-sm capitalize px-3 py-1.5 rounded-full font-semibold text-white ${typeColors[type.type.name] ?? "bg-gray-400"}`}>
                    {type.type.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex items-center justify-center mb-6">
            <Image
              src={pokemon.sprites?.other?.["official-artwork"]?.front_default ?? pokemon.sprites?.front_default ?? "https://placehold.co/400"}
              alt={pokemon.name}
              width={400}
              height={400}
              className="drop-shadow-2xl"
            />
          </div>

          {description && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 h-screen flex items-center">
          <div className="flex flex-col gap-6 w-full">
            {/* Physical */}
            <div className="flex flex-col gap-3 items-start justify-start">
              <h2 className="font-bold text-lg">Physical</h2>
              <div className="w-full">
                <div className="grid grid-cols-4 gap-3">
                  <div className="flex flex-col gap-2 border border-gray-200 rounded-xl w-full py-3 px-2 bg-linear-to-br from-blue-50 to-blue-100">
                    <p className="font-semibold text-sm text-gray-700">Height</p>
                    <p className="text-xl font-bold">{(pokemon.height / 10).toFixed(1)}m</p>
                  </div>
                  <div className="flex flex-col gap-2 border border-gray-200 rounded-xl w-full py-3 px-2 bg-linear-to-br from-purple-50 to-purple-100">
                    <p className="font-semibold text-sm text-gray-700">Weight</p>
                    <p className="text-xl font-bold">{(pokemon.weight / 10).toFixed(1)}kg</p>
                  </div>
                  <div className="flex flex-col gap-2 border border-gray-200 rounded-xl w-full py-3 px-2 bg-linear-to-br from-green-50 to-green-100">
                    <p className="font-semibold text-sm text-gray-700">Base Exp.</p>
                    <p className="text-xl font-bold">{pokemon.base_experience}</p>
                  </div>
                  <div className="flex flex-col gap-2 border border-gray-200 rounded-xl w-full py-3 px-2 bg-linear-to-br from-orange-50 to-orange-100">
                    <p className="font-semibold text-sm text-gray-700">Moves</p>
                    <p className="text-xl font-bold">{pokemon.moves.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Abilities */}
            <div className="flex flex-col gap-3 items-start justify-start">
              <h2 className="font-bold text-lg">Abilities</h2>
              <div className="w-full flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <div
                    key={ability.ability.name}
                    className={`px-4 py-2 rounded-full font-medium text-sm ${ability.is_hidden
                      ? "bg-purple-100 text-purple-700 border-2 border-purple-300"
                      : "bg-gray-100 text-gray-700 border border-gray-300"
                      }`}
                  >
                    {ability.ability.name.replace('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    {ability.is_hidden && " (Hidden)"}
                  </div>
                ))}
              </div>
            </div>

            {/* Breeding Info */}
            {pokemonSpecies && (
              <div className="flex flex-col gap-3 items-start justify-start">
                <h2 className="font-bold text-lg">Breeding</h2>
                <div className="w-full grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Egg Groups</p>
                    <p className="font-semibold text-gray-800 capitalize">
                      {pokemonSpecies.egg_groups.map(g => g.name).join(', ')}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Gender Ratio</p>
                    <p className="font-semibold text-gray-800">
                      {pokemonSpecies.gender_rate === -1
                        ? "Genderless"
                        : `♀ ${(pokemonSpecies.gender_rate / 8 * 100).toFixed(0)}% / ♂ ${((8 - pokemonSpecies.gender_rate) / 8 * 100).toFixed(0)}%`}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Capture Rate</p>
                    <p className="font-semibold text-gray-800">{pokemonSpecies.capture_rate}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Base Happiness</p>
                    <p className="font-semibold text-gray-800">{pokemonSpecies.base_happiness}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="flex flex-col gap-3 items-start justify-start">
              <h2 className="font-bold text-lg">Stats</h2>
              <div className="w-full">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="flex items-center gap-3 mb-3">
                    <p className="w-36 text-sm text-left font-semibold capitalize text-gray-700">
                      {stat.stat.name.replace('-', ' ')}
                    </p>
                    <p className="w-12 text-sm font-bold text-gray-800">
                      {stat.base_stat}
                    </p>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`${statColors[stat.stat.name] ?? 'bg-gray-500'} h-full rounded-full transition-all duration-500`}
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
    </div>
  );
}