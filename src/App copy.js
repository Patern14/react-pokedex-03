import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import PokemonCard from "./components/PokemonCard";
import PokemonDetails from "./components/PokemonDetails";

function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")
  const [pokemon, setPokemon] = useState()

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
    //console.log(data)
    //console.log(allPokemons)
  };
 
  useEffect(() => {
    getAllPokemons();

    /* Used by PokemonDetails Component ======================== */
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0")
      .then((res) => res.json())
      .then((data) => {
        const results = data.results.map((pokemon, idx) => {
          return {...pokemon, idx: idx+1}
        })
        setPokemon({...data, results})
      })
    /* ======================================================= */
    //console.log(allPokemons)
    //console.log(pokemon)
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Link to="/">
          <Header />
        </Link>
        
        
        <div className="pokemon-container" >
          <div className="all-container">
            {allPokemons.map((pokemon, index) => 
              <PokemonCard 
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

        <Footer />
      </div>

      <Switch>  {/* We can have different routes inside Switch */}
        <Route path="/pokemondetails/:slug">  {/* Allow url modif */}
          <PokemonDetails></PokemonDetails>
        </Route>
        {/* <Route path="/" >
          {pokemon &&
            <PokemonList pokemon={pokemon.results} />
          }
        </Route> */}
      </Switch>

    </Router>
  );
}

export default App;
