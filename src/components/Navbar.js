import React from "react";
import {Link} from "react-router-dom";
import PokemonList from "./PokemonList";
import RandomPokemon from "./RandomPokemon";
import list from "../images/list.png";

/* TODO: ================================================================
    Styling
========================================================================*/

const Navbar = () => {
    return (
        <nav>
            <Link to="/pokemonlist">
                <button className="nav_button" >Pokemon list <img className="nav_icon" src={list} alt=""/> </button>
            </Link>
        
            <RandomPokemon/>
        </nav>
    )
}

export default Navbar;