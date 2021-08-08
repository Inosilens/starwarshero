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
        <div key={i}>
          <div className="hero__lovely__card d-flex flex-row m-5 p-5">
            <div>
              <img
                width="300px"
                src={`${IMG_URL + getId(item.url)}.jpg`}
                alt={item.name}
              />
            </div>

            <div className="card-body p-5">
              <h3 className="card-text"> {item.name} </h3>
              <ul className="hero_characteristics pt-5">
                <h1>Characteristics : </h1>
                <li className="hero_name"> Height: {item.height}</li>
                <li className="hero_birthday">
                  Birth year : {item.birth_year}
                </li>
                <li className="hero_gender">Gender : {item.gender}</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LovelyHero;
