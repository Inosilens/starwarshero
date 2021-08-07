import React, { Component } from "react";

import { Link } from "react-router-dom";

class NavLinks extends Component {
  render() {
    return (
      <nav>
        <Link to={"/"} onClick={() => this.forceUpdate()}>
          <button className=" m-3 btn btn-secondary">Home</button>
        </Link>
        <Link to={"/favorites"} onClick={() => this.forceUpdate()}>
          <button className="btn btn-secondary">Favorites</button>
        </Link>
      </nav>
    );
  }
}

export default NavLinks;
