import React, {useEffect, useState} from "react";
import PokemonCard from "./PokemonCard";

/* TODO: ================================================================
    Check order by id before displaying pokemons
    Display by generations
========================================================================*/

const PokemonList = () => {
    
    const [allPokemons, setAllPokemons] = useState([])
    const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")
    const [pokemon, setPokemon] = useState()

    const getAllPokemons = async () => {
        const res = await fetch(loadMore);
        const data = await res.json();

        setLoadMore(data.next);

        function createPokemonObject(result) {
            result.forEach(async (pokemon) => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                const data = await res.json();

                setAllPokemons(currentList => [...currentList, data]);  // Get the currentList and push data at the end of it.
            });
        };

        createPokemonObject(data.results);
    };
 
  useEffect(() => {
    getAllPokemons();

    /* Used by PokemonDetails Component ======================== */
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0")
      .then((res) => res.json())
      .then((data) => {
        const results = data.results.map((pokemon, idx) => {
          return {...pokemon, idx: idx+1}
        })
        setPokemon({...data, results})
      })
    /* ======================================================= */

  }, []);

    return (
        <div className="pokemon-container" >
            <div className="all-container">
                {allPokemons.map((pokemon, index) => 
                // Create a Card for each pokemon
                <PokemonCard 
                    key={index}
                    id={pokemon.id} 
                    name={pokemon.name} 
                    image={pokemon.sprites.other["official-artwork"].front_default} 
                    type={pokemon.types[0].type.name}
                    typeb={pokemon.types[1] ? pokemon.types[1].type.name : ""}  // Add second type if exist.
                />  
                )}
            </div>

            <div className="load-more-container" >
                <button className="load-more" onClick={getAllPokemons} >Load more pokemons</button>
            </div>
        </div>
    )
}

export default PokemonList;