import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import HeroList from "./components/HeroList";
import LovelyHero from "./components/LovelyHero";
import Pagination from "./components/Pagination";
import { getListOfName } from "./services/getListOfName";
import "bootstrap-css"

function App() {
  const [lovely, setLovelyHero] = useState([]); //массив избраных
  const [loading, setLoading] = useState(false); //загрузка
  const [currentPage, setCurrentPage] = useState(1); //текущая страница
  const [searchValue, setSearchValue] = useState(""); //значение поиска

  const [listOfPeople, setListOfPeople] = useState([]);
  const [allData, setAllData] = useState(null);



  useEffect(() => {
    setLoading(true);
    if(searchValue){
        getListOfName(`https://swapi.dev/api/people/?search=${searchValue}`)
            .then((response) => {
                setListOfPeople(response.results);
                setLoading(false);
            });
    }else {
        getListOfName(`https://swapi.dev/api/people/?page=${currentPage}&format=json`)
            .then((response) => {
                setListOfPeople(response.results);
                setLoading(false);
            });
    }
  }, [currentPage,searchValue]);

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
