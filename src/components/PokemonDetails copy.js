import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const PokemonDetails = () => {
    const {slug} = useParams();
    const [pokemon, setPokemon] = useState();
    const [species, setSpecies] = useState();
    const [evolutions, setEvolutions] = useState();
    //const [generation, setGeneration] = useState();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${slug}/`)
            .then((res) => res.json())
            .then((data) => {
                setPokemon(data)
                //console.log(data);
                //console.log("Slug: " + slug)
                //console.log("fetch 1")
            })
            .then(
                fetch(pokemon && `https://pokeapi.co/api/v2/pokemon-species/${slug}/`)
                    .then((res) => res.json())
                    .then((data) => {
                        setSpecies(data)
                        console.log(data);
                        console.log("fetch 2")
                    })
            )
            .then(
                fetch(species && species.evolution_chain.url)
                    .then((res) => res.json())
                    .then((data) => {
                        setEvolutions(data)
                        console.log(data);
                        console.log("fetch 3")
                    })
            )
                            
        console.log(pokemon)
        console.log(species) 
        console.log(evolutions)
        
    }, [slug]);

    console.log(pokemon)
    console.log(species) 
    console.log(evolutions)


    return (
        <>
        {pokemon && 
        <div className="pokemon_details" >
            <h1>Pokemon Details Component - {slug} </h1> 
            <p>Pokemon Species URL: <a href={pokemon.species.url}>{pokemon.species.url}</a></p>
            <p>Species Evolution_Chain URL: <a href={species && species.evolution_chain.url}> {species && species.evolution_chain.url}</a></p>
            <p>Evolutions Chain Species Name: <a href={evolutions && evolutions.chain.species.name} >{evolutions && evolutions.chain.species.name}</a></p>
            <div className="poke_portrait">
                <h4 className="portrait_name" >{pokemon.name} </h4>
                <h4 className="portrait_gen">{/* {generation.names[5].name} */} </h4>
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
                <div>Evo 1:  </div> 
                <div>Evo 2:  </div> 
                <div>Evo 3:  </div> 
            </div>
        </div>
        }
        </>
    )
}

export default PokemonDetails;