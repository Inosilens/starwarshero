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
  const SAVE_INDEX = (index) =>
    currentPage === 1 ? index + 1 : (currentPage - 1) * 10 + index + 1;
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
            <div key={item[index]} className="container__box">
              <img
                width="200px"
                height="200px"
                src={`https://starwars-visualguide.com/assets/img/characters/${
                  currentPage === 1
                    ? index + 1
                    : (currentPage - 1) * 10 + index + 2
                }.jpg`}
                alt=""
              />
              <h3 key={item}> {item} </h3>

              <i
                className="fas fa-heart "
                onClick={() => addLovely(item, SAVE_INDEX(index))}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroList;
