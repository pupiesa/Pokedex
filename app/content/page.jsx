"use client";
import React from "react";
import axios from "axios";
import Image from "next/image";

function Page() {
  const [pokem, setPokem] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const getData = async () => {
    try {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=9");
      const data = res.data.results;
      data.forEach(async (pokemon) => {
        try {
          const response = await axios.get(pokemon.url);
          if (response.status !== 200)
            throw new Error(`Failed to fetch data for ${pokemon.name}`);
          const data = response.data;
          let imageCharecter = data.sprites.other["dream_world"].front_default;
          let nameCharecter = data.name;
          console.log(data.types);
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
          console.log(`${pokemon.types} data:`, data);
        } catch (error) {
          console.error(error.message);
        }
      });
      console.log(data.length);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("name", pokem);
  React.useEffect(() => {
    getData();
  }, []);

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
        <div className="bg-[#454545] max-w-[30vw] lg:max-w-[20vw] rounded-lg w-full flex items-center justify-center">
          <div className="w-1/5 flex border-solid border-2 rounded-l-lg justify-center">
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
            className="w-4/5 h-[100%] bg-[#454545] rounded-r-lg border-solid border-2"
          />
        </div>
        {/* type filter */}
        <select className="bg-[#454545] border-solid border-2 rounded-lg w-[23%] flex items-end">
          <option>test</option>
          <option>test2</option>
        </select>
      </div>
      {/* parent grid */}
      <div className="grid rounded-lg gap-y-2 gap-x-3 mt-10 bg-[#8f8f8f] border-solid border-2 p-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-7">
        {filteredPokem.map((pokemDetail, index) => (
          <div
            key={index}
            className="rounded-2xl flex-col items-center mt-10 bg-black border-solid border-2 p-3 w-[100%] "
            style={{
              backgroundImage: "url(/images/cardBg.svg)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100%",
            }}
          >
            {/* Picture size */}
            <div className="flex flex-col pb-2 items-center w-[100%]">
              <div className="flex justify-center h-10">
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
              </div>
              <div className="text-white">{pokemDetail.name}</div>
              <div className="flex flex-row w-[100%]">
                <div className="flex flex-row w-[100%] text-center items-center justify-evenly text-[0.75rem]">
                  <div className="bg-black rounded-lg px-1 ">poisonsss</div>
                  <div className="bg-blue-500 rounded-lg px-1">watersss </div>
                </div>
              </div>
              <div className="flex items-center flex-col min-w-[80%]">
                <div className="flex flex-row w-[100%] text-center text-[1rem]">
                  <div className="w-[50%]">{pokemDetail.height} m</div>
                  <div className="w-[50%]">{pokemDetail.weight} kg</div>
                </div>
                <div className="flex flex-row w-[100%] text-center">
                  <div className="w-[50%]">height</div>
                  <div className="w-[50%]">weight</div>
                </div>
              </div>
              <button className="bg-black rounded-lg px-1">More Detail</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
