import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";

const PokemonDetails = () => {
    let {slug} = useParams();
    //const [slug, setSlug] = useState();
    const [pokemon, setPokemon] = useState();
    const [species, setSpecies] = useState();
    const [evolutions, setEvolutions] = useState();
    
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${slug}/`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Slug: " + slug)
                setPokemon(data)
                //console.log(data)
                //console.log("%cfetch 1 => pokemon set", "color:red; font-size:20px")

                fetch(data.species.url)
                    .then(res => res.json())
                    .then(data => {
                        setSpecies(data)
                        //console.log(data)
                        //console.log("%cfetch 2 => species set", "color:blue; font-size:20px")

                        fetch(data.evolution_chain && data.evolution_chain.url)
                            .then(res => res.json())
                            .then(data => {
                                setEvolutions(data)
                                //console.log(data)
                                //console.log("%cfetch 3 => evolutions set", "color:green; font-size:20px")
                            })
                    })
            })
        
    }, [slug]);

    const ifEvoOne = evolutions;
    const evoOneName = evolutions.chain.species.name;

    const ifEvoTwo = evolutions && typeof evolutions.chain.evolves_to[0] != "undefined";
    const evoTwoName = evolutions.chain.evolves_to[0].species.name;

    const ifEvoThree = typeof evolutions != "undefined" && typeof evolutions.chain.evolves_to[0] != "undefined" && typeof evolutions.chain.evolves_to[0].evolves_to[0] != "undefined";
    const evoThreeName = evolutions.chain.evolves_to[0].evolves_to[0].species.name;

    return (
        <>
        {pokemon && 
        <div className="pokemon_details" >
            <h1>Pokemon Details Component - {slug} </h1> 
            <p>Pokemon Species URL: <a href={pokemon.species.url}>{pokemon.species.url}</a></p>
            <p>Species Evolution_Chain URL: <a href={species && species.evolution_chain.url}> {species && species.evolution_chain.url}</a></p>
            <p>Evolutions Chain Species Name: <a href={evolutions && evolutions} >{evolutions && evolutions.chain.species.name}</a></p>
            <div className="poke_portrait">
                <h4 className="portrait_name" >{pokemon.name} </h4>
                <h4 className="portrait_gen">{species && species.generation.name} </h4>
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
                <div>Evo 1: {evolutions && evolutions.chain.species.name} 
                <Link to={`/pokemondetails/${evolutions.chain.species.name}`} /* key={id} */ >
                    <img src="" alt="poke sprite" className="portrait_img_evo" />
                </Link> 
                </div>

                <div>Evo 2: {evolutions && typeof evolutions.chain.evolves_to[0] != "undefined" 
                    ? evolutions.chain.evolves_to[0].species.name 
                    : "No Evo 2"} 
                <Link to={`/pokemondetails/${evolutions.chain.evolves_to[0].species.name}`} /* key={id} */ >
                    <img src="" alt="poke sprite" className="portrait_img_evo" />
                </Link>
                </div>

                <div>Evo 3: {(typeof evolutions != "undefined" && typeof evolutions.chain.evolves_to[0] != "undefined" && typeof evolutions.chain.evolves_to[0].evolves_to[0] != "undefined") 
                    ? evolutions.chain.evolves_to[0].evolves_to[0].species.name 
                    : "No Evo 3"} 
                <Link to={`/pokemondetails/${evolutions.chain.evolves_to[0].evolves_to[0].species.name}`} /* key={id} */ >
                    <img src="" alt="poke sprite" className="portrait_img_evo" />
                </Link>
                </div> 

                <div>useparams: {JSON.stringify(slug)}</div>

            </div>
            
        </div>
        }
        </>
    )
}

export default PokemonDetails;