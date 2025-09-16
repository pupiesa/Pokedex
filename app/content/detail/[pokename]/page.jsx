import Image from "next/image";
import { Sparkles, Undo2 } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }) {
  return {
    title: `Pokédex | ${params.pokename}`,
    description: `Details for Pokémon ${params.pokename}`,
  };
}

async function getPokemon(pokename) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon data");
  return res.json();
}

export default async function PokemonDetailPage({ params }) {
  let pokemon;
  try {
    pokemon = await getPokemon(params.pokename);
  } catch (err) {
    return <div className="p-4 text-center text-red-500">{err.message}</div>;
  }

  return (
    <div className="w-full">
      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="relative flex flex-col items-center p-4 border-[0.5rem] bg-[#C15D6C] border-slate-200 dark:border-slate-700">
          <Image
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              "/images/cardBg.svg"
            }
            alt={pokemon.name}
            width={140}
            height={140}
            className="drop-shadow-sm"
          />
          <h1 className="text-2xl font-bold mt-2 capitalize text-slate-800 dark:text-slate-100 ">
            {pokemon.name}
          </h1>
          <div className="flex gap-2 mt-1">
            {pokemon.types.map((t, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500 text-white capitalize"
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-2 p-4 text-center text-sm">
          <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg">
            <p className="text-slate-500 dark:text-slate-300">Height</p>
            <p className="font-semibold">
              {(pokemon.height / 10).toFixed(1)} m
            </p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg">
            <p className="text-slate-500 dark:text-slate-300">Weight</p>
            <p className="font-semibold">
              {(pokemon.weight / 10).toFixed(1)} kg
            </p>
          </div>
        </div>

        {/* Abilities */}
        <div className="px-4 pb-3">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
            Abilities
          </h2>
          <div className="flex flex-wrap gap-1">
            {pokemon.abilities.map((a, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-100 rounded text-xs capitalize"
              >
                {a.ability.name}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 pb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
            Base Stats
          </h2>
          <div className="space-y-2">
            {pokemon.stats.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="capitalize">{s.stat.name}</span>
                  <span>{s.base_stat}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${(s.base_stat / 200) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/content">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-3">
              <Undo2 />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
