import React from "react";
import {Link} from "react-router-dom";
import PokemonList from "./PokemonList";
import RandomPokemon from "./RandomPokemon";

/* TODO: ================================================================
    Styling
========================================================================*/

const Navbar = () => {
    return (
        <nav>
            <Link to="/pokemonlist">
                <button className="btn-test" >Go to pokemon list</button>
            </Link>
            
            <RandomPokemon/>
        </nav>
    )
}

export default Navbar;