import React from "react";
import NavLinks from "./NavLinks";
import debounce from "../services/debounce";

function HeroList({
  addLovely,
  loading,
  setSearchValue,
  listOfPeople,
  searchValue,
}) {
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
  let changeInput = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };
  changeInput = debounce(changeInput, 500);
  return (
    <div>
      <NavLinks />
      <input placeholder="Searh Your Hero" onChange={changeInput} type="text" />
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          setSearchValue("");
        }}
      >
        Back to all list
      </button>
      <div className="hero__List ">
        <div className="row d-flex justify-content-center">
          {listOfPeople.map((item, index) => (
            <div className=" " key={index}>
              <div className=" card  p-5">
                <img
                  width="300px"
                  className="img-fluid"
                  src={`${IMG_URL + getId(item.url)}.jpg`}
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-text mt-3"> {item.name} </h5>

                  <button
                    type="button"
                    className="btn btn-secondary mt-3"
                    onClick={() => addLovely(item, index)}
                  >
                    Add to lovely
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroList;
