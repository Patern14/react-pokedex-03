import React from "react";

const PokemonThumbnail = ({id, name, image, type}) => {
    return (
        <div className="poke_card" >
            <div className="number">
                <h4>#0{id}</h4>
            </div>
            <img src={image} alt={name} className="poke_sprite" />
            <div className="details-container">
                <h4>{name} </h4>
                <h4>{type} </h4>
            </div>
        </div>
    )
}

export default PokemonThumbnail;