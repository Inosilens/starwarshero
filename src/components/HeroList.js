import React from "react";
import NavLinks from "./NavLinks";
import debounce from "../services/debounce";

function HeroList({
                      addLovely,
                      loading,
                      setSearchValue,
                      listOfPeople
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
    let changeInput = (e)=>{
        e.preventDefault()
        console.log(e.target.value)
        setSearchValue(e.target.value)
    }
     changeInput = debounce(changeInput,500)
    return (
        <div>
            <NavLinks />
            <input
                placeholder="Searh Your Hero"
                onChange={changeInput}
                type="text"
            />
            <button type="button" className="btn btn-primary" onClick={()=>{
                setSearchValue("")
            }}>Back to all list</button>
            <div className="container ">
                {listOfPeople.map((item, index) => (
                    <div key={index}>
                        <div className="container__box p-5">
                            <img
                                width="300px"

                                src={`${IMG_URL + getId(item.url)}.jpg`}
                                alt={item.name}
                            />
                            <h3> {item.name} </h3>

                            <button type="button" className="btn btn-secondary"  onClick={() => addLovely(item, index)}>Add to lovely</button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HeroList;
