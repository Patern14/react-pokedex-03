import React, { useEffect, useState } from "react";
import {useParams, Link} from "react-router-dom";
import previous from "../images/previous.png";

const PreviousPokemon = () => {
    const [previousPokemonNumber, setPreviousPokemonNumber] = useState();

    let slug = document.getElementById("poke_id") && parseInt(document.getElementById("poke_id").innerHTML, 10);

    useEffect(() => {
        let slug = document.getElementById("poke_id") && parseInt(document.getElementById("poke_id").innerHTML, 10);
        setPreviousPokemonNumber(parseInt(slug) - 1);
    }, [slug]);

    return (
        <div className="previous_pokemon_component" >
            <Link to={`/pokemondetails/${previousPokemonNumber}`}>
                <img className="previous_icon" src={previous} alt="Previous"/>
            </Link>
        </div>
    )
}

export default PreviousPokemon;