import React from "react";
import {Link} from "react-router-dom";

const PokemonList = ({pokemon: results}) => {
    //console.log(results)
    return (
        <div className="pokemon_infos" >
            <h1>
                PokemonList COMPONENT
            </h1>
            <div>
                {results &&
                    results.map((val, idx) => (
                        <Link to={`/pokemondetails/${val.idx}`} key={idx} ><div className="poke_link">{val.name}</div></Link>))
                }
            </div>
        </div>
    )
}

export default PokemonList;