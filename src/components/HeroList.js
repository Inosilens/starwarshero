import React from "react";
import NavLinks from "./NavLinks";
import debounce from "../services/debounce";

function HeroList({
                      addLovely,
                      loading,
                      setSearchValue,
                      listOfPeople,
                      searchValue
                  }) {
    if (loading) {
        return (
            <div className="loader-ring">
                <div/>
                <div/>
                <div/>
            </div>
        );
    }

    function getId(url) {
        return url.split("/")[url.split("/").length - 2];
    }

    const IMG_URL = "https://starwars-visualguide.com/assets/img/characters/";
    let changeInput = (e) => {
        e.preventDefault()
        setSearchValue(e.target.value)
    }
    changeInput = debounce(changeInput, 500)
    return (
        <div>
            <NavLinks/>
            <input
                placeholder="Searh Your Hero"
                onChange={changeInput}
                type="text"

            />
            <button type="button" className="btn btn-secondary" onClick={() => {
                setSearchValue("")
            }}>Back to all list
            </button>
            <div className="hero__List">
                <div className="row ">
                    {listOfPeople.map((item, index) => (
                        <div className="col-3" key={index}>
                            <div className=" card  p-5">
                                <img
                                    width="300px"
                                    className="img-fluid"
                                    src={`${IMG_URL + getId(item.url)}.jpg`}
                                    alt={item.name}
                                />
                                <div className="card-body">
                                    <h3 className="card-text"> {item.name} </h3>

                                    <button type="button" className="btn btn-secondary"
                                            onClick={() => addLovely(item, index)}>Add to lovely
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
