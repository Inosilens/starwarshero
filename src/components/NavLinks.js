import React, { Component } from "react";

import { Link } from "react-router-dom";

 class NavLinks extends Component {
    render() {
        return (
            <nav>
                <Link to={"/"} onClick={() => this.forceUpdate()}>
                    <button className="button__links">Home</button>
                </Link>
                <Link to={"/favorites"} onClick={() => this.forceUpdate()}>
                    <button className="button__links">Favorites</button>
                </Link>
            </nav>
        );
    }
}

export default NavLinks
