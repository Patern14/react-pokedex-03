import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import PokemonThumbnail from "./components/PokemonCard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PokemonInfos from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";

function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")
  //const [pokemon, setPokemon] = useState({})

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject (result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();

        setAllPokemons(currentList => [...currentList, data]);  // Get the currentList and push data at the end of it.
      });
    };
    createPokemonObject(data.results);
    console.log(data)
    console.log(allPokemons)
  };
 
  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <div className="pokemon-container" >
          <div className="all-container">
            {allPokemons.map((pokemon, index) => 
              <PokemonThumbnail 
                key={index}
                id={pokemon.id} 
                name={pokemon.name} 
                image={pokemon.sprites.other.dream_world.front_default} 
                type={pokemon.types[0].type.name}
                typeb={pokemon.types[1] ? pokemon.types[1].type.name : ""}  // Add second type if exist.
              />  
            )}
          </div>

          <button className="load-more" onClick={getAllPokemons} >Add more</button>
          
        </div>

          {allPokemons &&
            <PokemonInfos pokemon={allPokemons.results} />
          }

        <Footer />
      </div>

      <Switch>  {/* We can have different routes inside Switch */}
        <Route path="/pokemondetails/:slug">  {/* Allow url modif */}
          <PokemonDetails></PokemonDetails>
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
