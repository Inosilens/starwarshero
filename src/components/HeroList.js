import React from "react";
import NavLinks from "./NavLinks";
import Pagination from "./Pagination";

function HeroList({ data, addLovely,loading }) {
    if (loading){
        return (<div className="loader-ring">
            <div /><div /><div />
        </div>)
    }
  return (
    <div>
      <NavLinks />
      <div className="container">
        {data.map((item, index) => (
          <div>
            <div key={item[index]} className="container__box">
              <img
                width="200px"
                height="200px"
                src={`https://starwars-visualguide.com/assets/img/characters/${
                  index + 1
                }.jpg`}
                alt=""
              />
              <h3 key={item}> {item.name} </h3>

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
