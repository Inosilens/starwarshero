import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import getData from "./services/getData";
import HeroList from "./components/HeroList";
import LovelyHero from "./components/LovelyHero";

function App(props) {
  const [allData, setAllData] = useState([]);
  const [dataName, setData] = useState([]);
  const [lovely, setLovelyHero] = useState([]);

  useEffect(() => {
    getResponse().then((r) => {
      setData(r.results);
      setAllData(r)
    });
  });
  const getResponse = async () => {
    return await getData();
  };
  const addLovely = (love, index) => {
    let check = lovely.some(function (e) {
      return e.index === index;
    });
    if (!check) {
      setLovelyHero([...lovely, { love, index }]);
    }
  };

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={() => <HeroList data={dataName} addLovely={addLovely} />}
        />
        <Route
          path="/favorites"
          render={() => <LovelyHero lovelyList={lovely} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
