import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import NextPokemon from "./NextPokemon";
import PreviousPokemon from "./PreviousPokemon";

/* TODO: ================================================================
    Handle composite-names
========================================================================*/

const PokemonDetails = () => {

    let {slug} = useParams();
    const [pokemon, setPokemon] = useState();
    const [species, setSpecies] = useState();
    const [evolutions, setEvolutions] = useState();

    const [evoOneSprite, setEvoOneSprite] = useState();
    const [evoTwoSprite, setEvoTwoSprite] = useState();
    const [evoThreeSprite, setEvoThreeSprite] = useState();
    
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${slug}/`)
            .then((res) => res.json())
            .then((data) => {
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

    /* Evolutions and conditions =============================================================== */
    const ifEvoOne = evolutions;
    const evoOneName = ifEvoOne && evolutions.chain.species.name;

    const ifEvoTwo = evolutions && typeof evolutions.chain.evolves_to[0] != "undefined";
    const evoTwoName = ifEvoTwo && evolutions.chain.evolves_to[0].species.name;

    const ifEvoThree = typeof evolutions != "undefined" && typeof evolutions.chain.evolves_to[0] != "undefined" && typeof evolutions.chain.evolves_to[0].evolves_to[0] != "undefined";
    const evoThreeName = ifEvoThree && evolutions.chain.evolves_to[0].evolves_to[0].species.name;

    /* Get evolutions sprites ================================================================ */
    ifEvoOne && fetch(`https://pokeapi.co/api/v2/pokemon/${evoOneName}/`)
        .then((res) => res.json())
        .then(data => {
            //console.log(data)
            setEvoOneSprite(data.sprites.other["official-artwork"].front_default)   // ["Something-else"] formatting to avoid error: 'else' is not defined.
        });

    ifEvoTwo && fetch(`https://pokeapi.co/api/v2/pokemon/${evoTwoName}/`)
        .then((res) => res.json())
        .then(data => {
            setEvoTwoSprite(data.sprites.other["official-artwork"].front_default)
        });

    ifEvoThree && fetch(`https://pokeapi.co/api/v2/pokemon/${evoThreeName}/`)
        .then((res) => res.json())
        .then(data => {
            setEvoThreeSprite(data.sprites.other["official-artwork"].front_default)
        });

    /* Types and background colors =============================================================== */
    const typeA = pokemon && pokemon.types[0].type.name;
    const typeB = pokemon && pokemon.types[1] && pokemon.types[1].type.name;

    return (
        <>
        {pokemon && 
        <div className="pokemon_details" >
            {/* Portrait ================================================================================================= */}
            <div className={`poke_portrait ${typeA}`} >
                <h1 id="poke_tag"> 
                    <PreviousPokemon/> 
                    <h1> # </h1> 
                    <h1 id="poke_id"> {pokemon.id} </h1> 
                    <NextPokemon/> 
                </h1>
                {/* <div className="round_background" > */}
                    <img src={pokemon.sprites.other["official-artwork"].front_default} alt="poke sprite" className="portrait_img" />
                {/* </div> */}
                <h2 className="portrait_name" > {pokemon.name} </h2>
            </div>

            {/* Infos ===================================================================================================== */}
            <div className="poke_infos">
                <h2>Infos</h2>
                <div id="portrait_gen"> {species && species.generation.name} </div>    {/* TODO: case styling */}
                <div className={`pokeType ${typeA}`}> <b>Type 1:</b> {typeA}</div> 
                <div className={`pokeType ${typeB}`}> <b>Type 2:</b> {typeB}</div> 
                <div> <b>Height:</b> {pokemon.height/10} m</div> 
                <div> <b>Weight:</b> {pokemon.weight/10} kg</div> 
            </div>

            {/* Stats (MAX = 250) ===================================================================================================== */}
            <div className="poke_stats">
                <h2>Stats</h2>
                <div><b>HP:</b></div> 
                <div className="rect" style={{width: (pokemon.stats[0].base_stat/250 *100) +'%'}}> {pokemon.stats[0].base_stat} </div>

                <div><b>Atk:</b></div>
                <div className="rect" style={{width: (pokemon.stats[1].base_stat/250 *100) +'%'}}> {pokemon.stats[1].base_stat}</div> 

                <div><b>Def:</b></div>
                <div className="rect" style={{width: (pokemon.stats[2].base_stat/250 *100) +'%'}}> {pokemon.stats[2].base_stat}</div>  

                <div><b>Atk Spe:</b></div>
                <div className="rect" style={{width: (pokemon.stats[3].base_stat/250 *100) +'%'}}> {pokemon.stats[3].base_stat}</div>   

                <div><b>Def Spe:</b></div> 
                <div className="rect" style={{width: (pokemon.stats[4].base_stat/250 *100) +'%'}}> {pokemon.stats[4].base_stat}</div> 

                <div><b>Speed:</b></div>
                <div className="rect" style={{width: (pokemon.stats[5].base_stat/250 *100) +'%'}}> {pokemon.stats[5].base_stat}</div>  

            </div>
             
            {/* Evolutions ================================================================================================= */}
            <div className="poke_evolutions">
                <h2>Evolutions</h2>
                <div className="evolutions">
                    {ifEvoOne &&
                        <Link to={`/pokemondetails/${evoOneName}`} >
                            <div className="evo_one">
                                <img src={evoOneSprite} alt="Evolution 1 image" className={typeA} />
                                <div>1 <b>{evoOneName}</b></div>
                            </div>
                        </Link>
                    }
                    {ifEvoTwo &&
                        <Link to={`/pokemondetails/${evoTwoName}`} >
                            <div className="evo_two">
                                <img src={evoTwoSprite} alt="Evolution 2 image" className={typeA} />
                                <div>2 <b>{evoTwoName}</b></div>
                            </div>
                        </Link>
                    }
                    {ifEvoThree &&
                        <Link to={`/pokemondetails/${evoThreeName}`} >
                            <div className="evo_three">
                                <img src={evoThreeSprite} alt="Evolution 3 image" className={typeA} />
                                <div>3 <b>{evoThreeName}</b></div>
                            </div>
                        </Link>
                    }
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default PokemonDetails;