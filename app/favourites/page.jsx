"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, Undo2, Trash2 } from "lucide-react";

export default function FavouritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleDelete = async (pokemonName) => {
    try {
      await fetch("/api/favourites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pokemonName }),
      });
      setFavorites((prev) => prev.filter((f) => f.pokemonName !== pokemonName));
    } catch (err) {
      // Optionally show error
    }
  };

  useEffect(() => {
    async function fetchFavorites() {
      setLoading(true);
      try {
        const res = await fetch("/api/favourites");
        const favs = await res.json();
        if (!Array.isArray(favs)) throw new Error("Failed to fetch favorites");
        // Fetch details for each favorite
        const details = await Promise.all(
          favs.map(async (fav) => {
            const pokeRes = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${fav.pokemonName}`
            );
            if (!pokeRes.ok) return null;
            const pokeData = await pokeRes.json();
            return {
              ...fav,
              img: pokeData.sprites.other["dream_world"].front_default,
              type: pokeData.types.map((t) => t.type.name),
              height: pokeData.height,
              weight: pokeData.weight,
            };
          })
        );
        setFavorites(details.filter(Boolean));
      } catch (err) {
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFavorites();
  }, []);

  const getTypeColor = (type) => {
    const colors = {
      normal: "bg-gray-400 text-black",
      fire: "bg-red-500 text-white",
      water: "bg-blue-500 text-white",
      electric: "bg-yellow-400 text-black",
      grass: "bg-green-500 text-white",
      ice: "bg-blue-300 text-black",
      fighting: "bg-red-700 text-white",
      poison: "bg-purple-500 text-white",
      ground: "bg-yellow-600 text-white",
      flying: "bg-indigo-400 text-white",
      psychic: "bg-pink-500 text-white",
      bug: "bg-lime-500 text-white",
      rock: "bg-gray-600 text-white",
      ghost: "bg-purple-700 text-white",
      dragon: "bg-indigo-700 text-white",
      dark: "bg-gray-800 text-white",
      steel: "bg-gray-400 text-black",
      fairy: "bg-pink-300 text-black",
    };
    return colors[type] || "bg-gray-500 text-white";
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!favorites.length)
    return <div className="p-8 text-center">No favorites found.</div>;

  return (
    <div className="flex w-[100vw] px-7 justify-center content-center flex-col lg:w-[70vw]">
      <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
      <div className="grid rounded-lg gap-y-2 gap-x-3 mt-2 bg-muted border-solid border-2 border-border p-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 min-h-[13rem]">
        {favorites.map((pokemDetail, index) => (
          <div
            key={index}
            className="rounded-2xl flex-col items-center mt-10 bg-card border-solid border-2 border-border p-3 w-[100%] text-card-foreground max-w-[10rem]"
            style={{
              backgroundImage: "url(/images/cardBg.svg)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100%",
            }}
          >
            <div className="flex flex-col pb-2 w-[100%]">
              <div className="flex justify-center h-10 relative">
                <Image
                  src={pokemDetail.img}
                  alt={pokemDetail.pokemonName}
                  loading="lazy"
                  width={150}
                  height={100}
                  style={{ width: "80%" }}
                  className="h-[40] -mt-8"
                />
                <button
                  className="absolute top-0 right-0 place-items-end p-1 text-red-500 hover:text-red-700"
                  title="Remove from favorites"
                  onClick={async (e) => {
                    e.stopPropagation();
                    await handleDelete(pokemDetail.pokemonName);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="text-foreground text-center">
                {pokemDetail.pokemonName}
              </div>
              <div className="flex flex-row w-[100%]">
                <div className="flex flex-row w-[100%] text-center items-center justify-evenly text-[0.75rem] gap-1">
                  {pokemDetail.type && pokemDetail.type.length > 0 ? (
                    pokemDetail.type.map((type, typeIndex) => (
                      <div
                        key={typeIndex}
                        className={`${getTypeColor(type)} rounded-lg px-2 py-1 flex items-center gap-1 capitalize shadow-sm`}
                      >
                        <span>{type}</span>
                      </div>
                    ))
                  ) : (
                    <div className="bg-secondary text-secondary-foreground rounded-lg px-2 py-1 flex items-center gap-1 shadow-sm">
                      <span>normal</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center flex-col min-w-[80%]">
                <div className="flex flex-row w-[100%] text-center text-[1rem] text-foreground">
                  <div className="w-[50%]">
                    {(pokemDetail.height / 10).toFixed(1)} m
                  </div>
                  <div className="w-[50%]">
                    {(pokemDetail.weight / 10).toFixed(1)} kg
                  </div>
                </div>
                <div className="flex flex-row w-[100%] text-center text-muted-foreground">
                  <div className="w-[50%]">height</div>
                  <div className="w-[50%]">weight</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
