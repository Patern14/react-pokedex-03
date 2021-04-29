import React, { useEffect, useState } from "react";
import {useParams, Link} from "react-router-dom";
import next from "../images/next.png";

const NextPokemon = () => {
    const [nextPokemonNumber, setNextPokemonNumber] = useState();

    let slug = document.getElementById("poke_id") && parseInt(document.getElementById("poke_id").innerHTML, 10);

    useEffect(() => {
        slug = document.getElementById("poke_id") && parseInt(document.getElementById("poke_id").innerHTML, 10);
        setNextPokemonNumber(parseInt(slug) + 1 )
    }, [slug]);

    return (
        <div className="next_pokemon_component" >
            <Link to={`/pokemondetails/${nextPokemonNumber}`}>
                <img className="next_icon" src={next} alt="Next"/>
            </Link>
        </div>
    )
}

export default NextPokemon;