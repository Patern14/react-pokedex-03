import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";

const PokemonDetails = () => {
    //console.log("%cPokemonDetails COMPONENT", "color:magenta; font-size:25px")

    let {slug} = useParams();
    const [pokemon, setPokemon] = useState();
    const [species, setSpecies] = useState();
    const [evolutions, setEvolutions] = useState();
    
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${slug}/`)
            .then((res) => res.json())
            .then((data) => {
                //console.log("Slug: " + slug)
                setPokemon(data)

                fetch(data.species.url)
                    .then(res => res.json())
                    .then(data => {
                        setSpecies(data)

                        fetch(data.evolution_chain && data.evolution_chain.url)
                            .then(res => res.json())
                            .then(data => {
                                setEvolutions(data)
                            })
                    })
            })
        
    }, [slug]);

    const ifEvoOne = evolutions;
    const evoOneName = ifEvoOne && evolutions.chain.species.name;

    const ifEvoTwo = evolutions && typeof evolutions.chain.evolves_to[0] != "undefined";
    const evoTwoName = ifEvoTwo && evolutions.chain.evolves_to[0].species.name;

    const ifEvoThree = typeof evolutions != "undefined" && typeof evolutions.chain.evolves_to[0] != "undefined" && typeof evolutions.chain.evolves_to[0].evolves_to[0] != "undefined";
    const evoThreeName = ifEvoThree && evolutions.chain.evolves_to[0].evolves_to[0].species.name;

    //console.log(species && typeof species.generation.name)

    /* Background color ================================= */
    const type = pokemon && pokemon.types[0].type.name
    const style = `pokemon_details ${type}`

    return (
        <>
        {pokemon && 
        <div className={style} >
            <h1>Pokemon Details Component - {slug} </h1> 
            
            <div className="poke_portrait">
                <h4 className="portrait_name" >{pokemon.name} </h4>
                <h4 id="portrait_gen">{species && species.generation.name} </h4>
                <img src={pokemon.sprites.other.dream_world.front_default} alt="poke sprite" className="portrait_img" />
            </div>

            <div className="poke_infos">
                <div>Type 1: {pokemon.types[0].type.name}</div> 
                <div>Type 2: {pokemon.types[1] ? pokemon.types[1].type.name : ""}</div> 
                <div>Height: {pokemon.height/10} m</div> 
                <div>Weight: {pokemon.weight/10} kg </div> 
            </div>

            <div className="poke_stats">
                <div>HP: {pokemon.stats[0].base_stat} </div> 
                <div>Atk: {pokemon.stats[1].base_stat} </div> 
                <div>Atk Spe: {pokemon.stats[3].base_stat} </div>  
                <div>Def: {pokemon.stats[2].base_stat} </div> 
                <div>Def Spe: {pokemon.stats[4].base_stat} </div> 
                <div>Speed: {pokemon.stats[5].base_stat} </div> 
            </div>
             
            <div className="poke_evolutions">
                {ifEvoOne &&
                    <Link to={`/pokemondetails/${evoOneName}`} /* key={id} */ >
                        <div>Evo 1: {evoOneName} </div>
                    </Link>
                }
                {ifEvoTwo &&
                    <Link to={`/pokemondetails/${evoTwoName}`} /* key={id} */ >
                        <div>Evo 2: {evoTwoName} </div>
                    </Link>
                }
                {ifEvoThree &&
                    <Link to={`/pokemondetails/${evoThreeName}`} /* key={id} */ >
                        <div>Evo 3: {evoThreeName} </div>
                    </Link>
                }
            </div>
        </div>
        }
        </>
    )
}

export default PokemonDetails;