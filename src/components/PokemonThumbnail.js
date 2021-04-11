import React from "react";

const PokemonThumbnail = ({id, name, image, type, typeb}) => {

    const style = `poke_card_content ${type}`
    const typeStyle = `type ${type}`
    const typebStyle = `typeb ${typeb}`
    return (
        <div className="poke_card" >
            <div className={style} >
                <h4 className="pokeId" >#0{id}</h4>

                <img src={image} alt={name} className="poke_sprite" />

                <div className="details-container">
                    <h4 className="name" >{name} </h4>

                    <h4 className={typeStyle} >{type} </h4>
                    <h4 className={typebStyle} style={{visibility: typeb ? 'visible' : 'hidden'}}>{typeb} </h4>
                </div>

            </div>
        </div>
    )
}

export default PokemonThumbnail;