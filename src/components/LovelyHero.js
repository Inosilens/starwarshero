import React, { Component } from "react";
import NavLinks from "./NavLinks";

class LovelyHero extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { lovely } = this.props;
    return (
      <div>
        <NavLinks />
        {lovely.map((i, ind) => (
          <div key={ind}>{i.name}</div>
        ))}
      </div>
    );
  }
}

export default LovelyHero;
