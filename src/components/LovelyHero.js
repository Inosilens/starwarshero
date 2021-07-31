import React from "react";
import NavLinks from "./NavLinks";

function LovelyHero({ lovelyList }) {
  function getId(url) {
    return url.split("/")[url.split("/").length - 2];
  }
  const IMG_URL = "https://starwars-visualguide.com/assets/img/characters/";

  return (
    <div>
      <NavLinks />

      {lovelyList.map((item, i) => (
        <div className="container__box">
          <img
            width="200px"
            height="200px"
            src={`${IMG_URL + getId(item.url)}.jpg`}
            alt=""
          />
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default LovelyHero;
