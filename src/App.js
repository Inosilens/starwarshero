import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import HeroList from "./components/HeroList";
import LovelyHero from "./components/LovelyHero";
import Pagination from "./components/Pagination";

function App(props) {
  const [dataName, setDataName] = useState([]);
  const [lovely, setLovelyHero] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [namesPerPage] = useState(10);

  useEffect(() => {
    getData("https://swapi.dev/api/people/?format=json");
  }, [HeroList]);

  const getData = (url) => {
    fetch(url).then((r) => r.json().then((r) => getAllList(r)));
  };

  const namesArr = [];

  const getAllList = (data) => {
    for (let i = 0; i < data.results.length; i++)
      namesArr.push(data.results[i]);
    console.log(namesArr);
    if (data.next) {
      getData(data.next);
    }
    setDataName(namesArr);
  };

  const addLovely = (love, index) => {
    let check = lovely.some(function (e) {
      return e.index === index;
    });
    if (!check) {
      setLovelyHero([...lovely, { love, index }]);
    }
  };

  const lastNameIndex = currentPage + namesPerPage;
  const firstElemIndex = lastNameIndex - namesPerPage;
  const currentNamePage = dataName.slice(firstElemIndex, lastNameIndex);
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (<>
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
      <Pagination namesPerPage={currentNamePage} totalNames={dataName.length} pagination={pagination}/>
      </>
  );
}

export default App;
