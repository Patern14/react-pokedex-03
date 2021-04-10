import React, {useEffect, useState} from "react";
import './App.css';
import PokemonThumbnail from "./components/PokemonThumbnail";

function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    //setLoadMore(data.next);

    function createPokemonObject (result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();

        setAllPokemons(currentList => [...currentList, data]);  // Get the currentList and push data at the end of it.
      });
    };
    createPokemonObject(data.results);
    //console.log(allPokemons);
  };
 
  useEffect(() => {
    getAllPokemons();
    //console.log(allPokemons);
  }, []);

  /* function logPokemons() {
    console.log("Log All Pokemons")
    console.log(allPokemons)
  } */
  

  return (
    <div className="app-container">
      <h1>Pokedex 03</h1>
      {/* <button className="load-more" onClick={logPokemons}  >Log All Pokemons</button> */}

      <div className="pokemon-container" >
        <div className="all-container">
        {/* {allPokemons.map(pokemon => <li key={pokemon.id} >{pokemon.name} </li>)} */}
          {allPokemons.map((pokemon, index) => 
            <PokemonThumbnail 
              key={index}
              id={pokemon.id} 
              /* name={pokemon.name} 
              image={pokemon.sprites.other.dream_world.front_default} 
              type={pokemon.types[0].type.name} */
            />  
          )}
        </div>

        <button className="load-more" >Add more</button>
        
      </div>

    </div>
  );
}

export default App;
