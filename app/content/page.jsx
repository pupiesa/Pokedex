"use client";
import React from "react";
import axios from "axios";
import Image from "next/image";
import { Sparkles } from "lucide-react";

function Page() {
  const [pokem, setPokem] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [offset, setOffset] = React.useState(0);
  const [loadingMore, setLoadingMore] = React.useState(false);

  const getData = async (customOffset = 0, limit = 30) => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${customOffset}`
      );
      const data = res.data.results;
      for (const pokemon of data) {
        try {
          const response = await axios.get(pokemon.url);
          if (response.status !== 200)
            throw new Error(`Failed to fetch data for ${pokemon.name}`);
          const data = response.data;
          let imageCharecter = data.sprites.other["dream_world"].front_default;
          let nameCharecter = data.name;
          let typeCharecter = data.types.map((type) => type.type.name);
          let heightCharecter = data.height;
          let weightCharecter = data.weight;
          setPokem((prevPokemonList) => [
            ...prevPokemonList,
            {
              name: nameCharecter,
              img: imageCharecter,
              type: typeCharecter,
              weight: weightCharecter,
              height: heightCharecter,
            },
          ]);
        } catch (error) {
          console.error(error.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getData(0, 30);
    setOffset(30);
  }, []);

  // Function to get type icon path
  const getTypeIcon = (type) => {
    return `/images/pokeTypes/Type_${
      type.charAt(0).toUpperCase() + type.slice(1)
    }.svg`;
  };

  // Function to get type color
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

  // Function to handle changes in the search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query state
  };

  // Filter the Pokémon list based on the search query
  const filteredPokem = pokem.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex w-[100vw] px-7 justify-center content-center flex-col lg:w-[70vw]">
      <div className="w-full flex flex-row justify-between">
        {/* search */}
        <div className="bg-muted max-w-[30vw] lg:max-w-[20vw] rounded-lg w-full flex items-center justify-center">
          <div className="w-1/5 flex border-solid border-2 border-border rounded-l-lg justify-center">
            <Image
              src="/images/search.svg"
              alt="search"
              width={30}
              height={30}
              className="mb-1"
            />
          </div>
          <input
            type="text"
            placeholder="search"
            value={searchQuery} // Bind the input value to the search query state
            onChange={handleSearchChange} // Update the search query state on input change
            className="w-4/5 h-[100%] bg-muted rounded-r-lg border-solid border-2 border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        {/* type filter */}
        {/* <select className="bg-muted border-solid border-2 border-border rounded-lg w-[23%] flex items-end text-foreground">
          <option>test</option>
          <option>test2</option>
        </select> */}
      </div>
      {/* parent grid */}
      <div className="grid rounded-lg gap-y-2 gap-x-3 mt-2 bg-muted border-solid border-2 border-border p-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 min-h-[13rem]">
        {filteredPokem.map((pokemDetail, index) => (
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
            {/* Picture size */}
            <div className="flex flex-col pb-2 w-[100%]">
              <div className="flex justify-center h-10 relative">
                <Image
                  src={pokemDetail.img}
                  alt={pokemDetail.name}
                  loading="lazy"
                  width={150}
                  height={100}
                  style={{
                    width: "80%",
                  }}
                  className="h-[40] -mt-8"
                />
                <Sparkles
                  className="absolute top-0 right-0 place-items-end cursor-pointer transition"
                  onClick={async (e) => {
                    e.stopPropagation();
                    e.currentTarget.classList.add("text-yellow-400");
                    try {
                      await fetch("/api/favourites", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          pokemonName: pokemDetail.name,
                        }),
                      });
                      // Optionally show a toast or feedback
                    } catch (err) {
                      // Optionally handle error
                    }
                  }}
                />
              </div>
              <div className="text-foreground text-center">
                {pokemDetail.name}
              </div>
              <div className="flex flex-row w-[100%]">
                <div className="flex flex-row w-[100%] text-center items-center justify-evenly text-[0.75rem] gap-1">
                  {pokemDetail.type && pokemDetail.type.length > 0 ? (
                    pokemDetail.type.map((type, typeIndex) => (
                      <div
                        key={typeIndex}
                        className={`${getTypeColor(
                          type
                        )} rounded-lg px-2 py-1 flex items-center gap-1 capitalize shadow-sm`}
                      >
                        <Image
                          src={getTypeIcon(type)}
                          alt={`${type} type`}
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                        <span>{type}</span>
                      </div>
                    ))
                  ) : (
                    <div className="bg-secondary text-secondary-foreground rounded-lg px-2 py-1 flex items-center gap-1 shadow-sm">
                      <Image
                        src={getTypeIcon("normal")}
                        alt="normal type"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
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
              <button
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-1"
                onClick={() =>
                  (window.location.href = `/content/detail/${pokemDetail.name}`)
                }
              >
                More Detail
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-6">
        <button
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2"
          disabled={loadingMore}
          onClick={async () => {
            setLoadingMore(true);
            await getData(offset, 30);
            setOffset((prev) => prev + 30);
            setLoadingMore(false);
          }}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}

export default Page;
