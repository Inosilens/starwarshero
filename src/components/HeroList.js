import React from "react";
import NavLinks from "./NavLinks";

function HeroList({ data, addLovely, loading, currentPage, setSearchValue }) {
  if (loading) {
    return (
      <div className="loader-ring">
        <div />
        <div />
        <div />
      </div>
    );
  }
  function getId(url) {
    return url.split("/")[url.split("/").length - 2];
  }
  const IMG_URL = "https://starwars-visualguide.com/assets/img/characters/";

  return (
    <div>
      <NavLinks />
      <input
        key={HeroList}
        placeholder="Searh Your Hero"
        onChange={(event) => setSearchValue(event.target.value)}
        type="text"
      />
      <div className="container">
        {data.map((item, index) => (
          <div>
            <div key={index} className="container__box">
              <img
                width="200px"
                height="200px"
                src={`${IMG_URL + getId(item.url)}.jpg`}
                alt=""
              />
              <h3 key={item.name}> {item.name} </h3>

              <i
                className="fas fa-heart "
                onClick={() => addLovely(item, index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroList;
