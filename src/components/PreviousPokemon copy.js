import React, { useEffect, useState } from "react";
import {useParams, Link} from "react-router-dom";
import PokemonDetails from "./PokemonDetails";

const PreviousPokemon = () => {
    const [previousPokemonNumber, setPreviousPokemonNumber] = useState();

    let previous = console.log("0 => PREVIOUS need to be initialized")

    const generatePreviousPokemonNumber = () => { 
        previous = document.getElementById("poke_id") && parseInt(document.getElementById("poke_id").innerHTML, 10)
        setPreviousPokemonNumber(previous - 1)
    };

    useEffect(() => {
        generatePreviousPokemonNumber();
        setPreviousPokemonNumber(previous)
    }, []);


    return (
        <div className="previous_pokemon_component" >
            <Link to={`/pokemondetails/${previousPokemonNumber}`}>
                <button className="btn-test" onClick={generatePreviousPokemonNumber} >Previous pokemon</button>
            </Link>
        </div>
    )
}

export default PreviousPokemon;