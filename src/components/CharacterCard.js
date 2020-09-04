import React from "react";
import "./CharacterCard.css";
import { Link } from "react-router-dom";

function CharacterCard({ character }) {
  return (
    <div className="character-container">
      <Link to={`/characters/${character._id}`} className="link">
        <img
          src="/Charmander.png"
          alt={character.name}
          className="character-image"
        />
        <div className="character-name">
          {character.name ? character.name : "<Character Name>"}{" "}
        </div>
      </Link>
    </div>
  );
}

export default CharacterCard;
