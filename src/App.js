import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import Navbar from "./components/Navbar";

/* TODO: ================================================================
    SOMETHING for the homepage...

    Add pokemons to favorite list
    Display by generations
    Search pokemon by name or id
    Check order by id before displaying pokemons
    Handle composite-names
========================================================================*/

function App() {

  return (
    <Router>
      <div className="app-container">
        <div className="screen_top">
          <Link to="/">
            <Header />
          </Link>

          <Navbar/>
        </div>
        

        <Switch>  {/* We can have different routes inside Switch */}
          <Route exact path="/pokemonlist" component={PokemonList} />
          <Route path="/pokemondetails/:slug" component={PokemonDetails} />  {/* Allow url modif */}
        </Switch>

        <Footer/>
      </div>
    </Router>
  );
}

export default App;
