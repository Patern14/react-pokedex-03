import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const RandomPokemon = () => {
    const [randomPokemonNumber, setRandomPokemonNumber] = useState("");

    const generateRandomNumber = () => {
                setRandomPokemonNumber(Math.floor(Math.random() * 898 + 1))    // 898 is the total of pokemons in the API database.
    }

    useEffect(() => {

        generateRandomNumber();
    
    }, []);

    return (
        <div className="random_pokemon_component" >
            <Link to={`/pokemondetails/${randomPokemonNumber}`}>
                <button className="btn-test" onClick={generateRandomNumber} >Random pokemon</button>
            </Link>
        </div>
    )
}

export default RandomPokemon;