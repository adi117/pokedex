"use client"

import { usePokemon } from "@/context/usePokemon";
import { typeColors } from "@/types/Utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const limit = 24;
  const router = useRouter();

  const { displayedPokemons, fetchPokemons, fetchPokemon, initialized, setInitialized, loading } = usePokemon();

  const [pokemonName, setPokemonName] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!initialized || pokemonName.trim()) return;
    fetchPokemons(limit, page * limit);
  }, [page, pokemonName, fetchPokemons, initialized]);

  const handleFirstFetch = () => {
    fetchPokemons(limit, page * limit);
    setInitialized(true);
  }

  const handleSearch = async () => {
    const trimmedName = pokemonName.trim();
    await fetchPokemon(trimmedName.toLowerCase());
  }

  const handleClearSearch = () => {
    setPokemonName("")
    fetchPokemons(limit, page * limit)
  }

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-10 min-h-screen items-center justify-center bg-background font-sans m-10">

      {!initialized &&
        <div>
          <button
            onClick={handleFirstFetch}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Start fetching pokemons
          </button>
        </div>
      }


      {/* Search Menu */}
      {initialized &&
        <div className="flex gap-2 sticky md:relative top-0 w-full items-center justify-center bg-background py-3 shadow-2xs md:shadow-none">
          <input
            type="text"
            placeholder="Enter Pokemon name..."
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            className="px-3 py-1 rounded-lg border border-gray-300 text-black"
          />
          <button
            onClick={handleSearch}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
          <button
            onClick={handleClearSearch}
            className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      }

      {/* Pokemon List */}
      {initialized &&
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 w-full justify-between items-center text-center">
          {displayedPokemons?.map((pokemon) => (
            <div
              key={pokemon.name}
              className="flex flex-col items-center bg-white shadow-2xs rounded-2xl p-5 transition hover:shadow-xl"
              onClick={() => router.push(`/pokemon-details/${pokemon.name}`)}>
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
      }

      {/* Pagination */}
      {initialized &&
        <div className="w-full flex items-center justify-center sticky md:relative bottom-0 bg-background py-3 shadow-2xs md:shadow-none">
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={page === 0 || loading}
              className={`px-3 py-1 rounded-lg text-white ${page === 0
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
      }
    </div >
  );
}
