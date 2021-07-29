import React, { Component } from "react";
import NavLinks from "./NavLinks";

function LovelyHero({ lovelyList }) {
  return (
    <div>
      <NavLinks />
      {lovelyList.map((item) => (
        <div className="container__box">
          <img
            width="200px"
            height="200px"
            src={`https://starwars-visualguide.com/assets/img/characters/${
              item.index + 1
            }.jpg`}
            alt=""
          />
          <h3>{item.love.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default LovelyHero;
