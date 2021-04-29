import React from "react";
import pokemon_logo from "../images/pokemon_logo.svg.png";

const Header = () => {
    return (
        <header>
            <img id="pokemon_logo" src={pokemon_logo} alt="Pokemon logo"/>
        </header>
    )
}

export default Header;