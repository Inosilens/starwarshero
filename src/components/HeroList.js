import React, { Component } from "react";
import NavLinks from "./NavLinks";

class HeroList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getImg=(index)=>{
      return `https://starwars-visualguide.com/assets/img/characters/${index}.jpg`
  }
  render() {
    return (
      <>
        <NavLinks />
        <div className="container">
          {this.props.dataList.map((element, index) => (
            <div className="container__box" key={index}>
              <div>
                  <img src={ `https://starwars-visualguide.com/assets/img/characters/${index+1}.jpg` } width="200px" height="200px" alt="person"/>
                <h3>{element.name}</h3>
              </div>
              <div>
                <button
                  className="container__button"
                  key={element.index}
                  onClick={() => this.props.addFavorite(element)}
                >
                  Tap to add lovely
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default HeroList;
