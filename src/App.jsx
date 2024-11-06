import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import PokemonCard from "./Component/PokemonCard";

export default function App() {
  // All States
  const [myData, setMyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [search, setSearch] = useState("");
  const api = "https://pokeapi.co/api/v2/pokemon?limit=100";
  //====================================

  //  get pokemon APi data
  const getApi = async () => {
    try {
      const res = await fetch(api);
      const data = await res.json();
      const pokiData = data.results.map(async (currPoke) => {
        const res = await fetch(currPoke.url);
        const data = await res.json();
        return data;
      });
      const resolveData = await Promise.all(pokiData);
      setMyData(resolveData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(error);
    }
  };
  ///==============================================

  // handle search fuctionality for search pokemon
  console.log(search);
  const searchPokemon = myData.filter((curr) =>
    curr.name.toLowerCase().includes(search.toLowerCase())
  );

  //=====================================
  // useEffect hook===================================
  useEffect(() => {
    getApi();
  }, []);
  //===================================
  if (isLoading) {
    return (
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
  if (isError) {
    return <div className="error">Somthing is Wrong</div>;
  }
  return (
    <>
      <header>
        <h1>
          <span>P</span>O<span>K</span>E<span>M</span>O<span>N</span>
        </h1>
        <div className="search">
          <input
            type="text"
            placeholder="search pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <CiSearch />
          </button>
        </div>
      </header>
      <ul className="main">
        {searchPokemon.map((currPoki) => (
          <PokemonCard key={currPoki.id} data={currPoki} />
        ))}
      </ul>
    </>
  );
}
