import React from "react";
import {Link} from "react-router-dom";

const PokemonCard = ({id, name, image, type, typeb}) => {

    const style = `poke_card_content ${type}`
    const typeStyle = `type ${type}`
    const typebStyle = `typeb ${typeb}`
    return (
        <Link to={`/pokemondetails/${id}`} key={id} >
            <div className="poke_card" >
                <div className={style} >
                    <h4 className="pokeId" >#0{id}</h4>

                    <div className="poke_sprite_container">
                        <img src={image} alt={name} className="poke_sprite" />
                    </div>

                    <div className="details-container">
                        <h4 className="name" >{name} </h4>

                        <h4 className={typeStyle} >{type} </h4>
                        <h4 className={typebStyle} style={{visibility: typeb ? 'visible' : 'hidden'}}>{typeb} </h4>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default PokemonCard;