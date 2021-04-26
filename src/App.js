import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";

/* TODO: ================================================================
    Random Pokemon
    NavBar
========================================================================*/

function App() {

  return (
    <Router>
      <div className="app-container">
        <Link to="/">
          <Header />
        </Link>

        <Switch>  {/* We can have different routes inside Switch */}
          <Route exact path="/" component={PokemonList} />
          <Route path="/pokemondetails/:slug" component={PokemonDetails} />  {/* Allow url modif */}
        </Switch>

        <Footer/>
      </div>
    </Router>
  );
}

export default App;
