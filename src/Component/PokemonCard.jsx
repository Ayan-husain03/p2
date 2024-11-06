import React from "react";
import "./pokemon.css";

function PokemonCard({ data }) {
  return (
    <>
      <li className="card">
        <figure className="img">
          <img src={data.sprites.other.dream_world.front_default} alt="" />
        </figure>
        <div className="details">
          <h2>{data.name}</h2>
          <div className="type">
            <p className="poki-type">
              {data.types.map((curr) => curr.type.name).join(", ")}
            </p>
          </div>
          <div className="other-details">
            <p className="info">Height <br /> {data.height}</p>
            <p className="info">Weight {data.weight}</p>
            <p className="info">Speed {data.stats[5].base_stat}</p>
          </div>
          <div className="other-details">
            <p className="info">Experience {data.base_experience}</p>
            <p className="info">Attack {data.stats[1].base_stat}</p>
            <p className="info">
              Ability{" "}
              {data.abilities
                .map((curr) => curr.ability.name)
                .slice(0, 1)
                .join(", ")}
            </p>
          </div>
        </div>
      </li>
    </>
  );
}

export default PokemonCard;
