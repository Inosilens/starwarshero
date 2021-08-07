import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import HeroList from "./components/HeroList";
import LovelyHero from "./components/LovelyHero";
import Pagination from "./components/Pagination";
import { getListOfName } from "./services/getListOfName";
import "bootstrap-css";
import { searchName } from "./services/searchName";

function App() {
  const [lovely, setLovelyHero] = useState([]); //массив избраных
  const [loading, setLoading] = useState(false); //загрузка
  const [currentPage, setCurrentPage] = useState(1); //текущая страница
  const [searchValue, setSearchValue] = useState(""); //значение поиска
  const [listOfPeople, setListOfPeople] = useState([]);
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (!searchValue) {
      getListOfName(
        `https://swapi.dev/api/people/?page=${currentPage}&format=json`
      ).then((response) => {
        setAllData(response);
        setListOfPeople(response.results);
        setLoading(false);
      });
    } else {
      searchName(`https://swapi.dev/api/people/?search=${searchValue}`).then(
        (response) => {
          setAllData(response);
          setListOfPeople(response.results);
          setLoading(false);
        }
      );
    }
  }, [searchValue, currentPage]);

  const addLovely = (love) => {
    let check = lovely.some(function (e) {
      return e.name === love.name;
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
                  searchValue={searchValue}
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
