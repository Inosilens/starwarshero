import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import HeroList from "./components/HeroList";
import LovelyHero from "./components/LovelyHero";
import Pagination from "./components/Pagination";
import { getListOfName } from "./services/getListOfName";

function App() {
  const [lovely, setLovelyHero] = useState([]); //массив избраных
  const [loading, setLoading] = useState(false); //загрузка
  const [currentPage, setCurrentPage] = useState(1); //текущая страница
  const [searchValue, setSearchValue] = useState(""); //значение поиска

  const [listOfPeople, setListOfPeople] = useState([]);
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    setLoading(true);
    getListOfName("https://swapi.dev/api/people/?format=json").then(
        (response) => {
          setListOfPeople(response.results);
          setAllData(response);
          setLoading(false);
        }
    );
  }, []); //получение данных апи , прохождение по всему списку

  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.dev/api/people/?page=${currentPage}&format=json`)
        .then((data) => data.json())
        .then((response) => {
          setListOfPeople(response.results);
          setLoading(false);
        });
  }, [currentPage]);

  const addLovely = (love, index) => {
    let check = lovely.some(function (e) {
      return e.index === index;
    });
    if (!check) {
      setLovelyHero([...lovely, love]);
    }
  };

  return (
      <>
        <Router>
          <Switch>
            <Route
                path="/"
                exact
                render={() => (
                    <>
                      <HeroList
                          listOfPeople={listOfPeople}
                          loading={loading}
                          addLovely={addLovely}
                          setSearchValue={setSearchValue}
                      />
                      {allData?.count && (
                          <Pagination
                              lengthOfList={allData?.count}
                              setCurrentPage={setCurrentPage}
                              currentPage={currentPage}
                          />
                      )}
                    </>
                )}
            />

            <Route
                path="/favorites"
                render={() => (
                    <LovelyHero lovelyList={lovely} currentPage={currentPage} />
                )}
            />
          </Switch>
        </Router>
      </>
  );
}

export default App;
