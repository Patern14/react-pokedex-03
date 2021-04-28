import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import RandomPokemon from "./components/RandomPokemon";
import NextPokemon from "./components/NextPokemon";
import PreviousPokemon from "./components/PreviousPokemon";
import Navbar from "./components/Navbar";

/* TODO: ================================================================
    Sprites for generations 6+
    NavBar
    Add pokemons to favorite list
    Add favicon
========================================================================*/

function App() {

  return (
    <Router>
      <div className="app-container">
        <Link to="/">
          <Header />
        </Link>

        <Navbar/>

        {/* <Link to="/pokemonlist">
          <button className="btn-test" >Go to pokemon list</button>
        </Link> */}

        {/* <div className="prevRandNext_container">
          <PreviousPokemon/>
          <RandomPokemon/>
          <NextPokemon/>
        </div> */}

        <Switch>  {/* We can have different routes inside Switch */}
          <Route exact path="/pokemonlist" component={PokemonList} />
          {/* <Route path="/randompokemon" component={RandomPokemon} /> */}
          <Route path="/pokemondetails/:slug" component={PokemonDetails} />  {/* Allow url modif */}
        </Switch>

        <Footer/>
      </div>
    </Router>
  );
}

export default App;
