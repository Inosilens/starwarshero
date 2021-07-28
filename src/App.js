import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import getData from "./services/getData";
import HeroList from "./components/HeroList";
import LovelyHero from "./components/LovelyHero";


class App extends Component {
  constructor() {
    super();
    this.state = {
      allData: [],
      lovely: [],
    };
  }

  componentDidMount() {
    this.setList();
  }
  addFavorite = (love) => {
    console.log(love);

    if (this.state.lovely.indexOf(love))
      this.setState({
        lovely: [...this.state.lovely, love],
      });
  };

  setList = () => {
    return getData().then((r) => this.setState({ allData: r.results }));
  };
  render() {
    const { allData } = this.state;
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <HeroList dataList={allData} addFavorite={this.addFavorite} />
            )}
          />
          <Route
            path="/favorites"
            render={() => <LovelyHero lovely={this.state.lovely} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
