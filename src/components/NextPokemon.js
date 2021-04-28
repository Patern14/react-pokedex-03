import React, { useEffect, useState } from "react";
import {useParams, Link} from "react-router-dom";
import PokemonDetails from "./PokemonDetails";

const NextPokemon = () => {
    const [nextPokemonNumber, setNextPokemonNumber] = useState();

    let next = console.log("0 => NEXT need to be initialized")

    const generateNextPokemonNumber = () => { 
        next = document.getElementById("poke_id") && parseInt(document.getElementById("poke_id").innerHTML, 10)
        setNextPokemonNumber(next + 1)
    };

    useEffect(() => {
        generateNextPokemonNumber();
        setNextPokemonNumber(next)
    }, []);


    return (
        <div className="next_pokemon_component" >
            <Link to={`/pokemondetails/${nextPokemonNumber}`}>
                <button className="btn-test" onClick={generateNextPokemonNumber} >Next pokemon</button>
            </Link>
        </div>
    )
}

export default NextPokemon;