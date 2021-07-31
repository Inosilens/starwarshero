import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import HeroList from "./components/HeroList";
import LovelyHero from "./components/LovelyHero";
import Pagination from "./components/Pagination";
import { getListOfName } from "./services/getListOfName";

function App() {
  const [dataAll, setDataName] = useState([]); //массив данных
  const [lovely, setLovelyHero] = useState([]); //массив избраных
  const [loading, setLoading] = useState(false); //загрузка
  const [currentPage, setCurrentPage] = useState(1); //текущая страница
  const [namesPerPage] = useState(10); // количество выводимое на страницу
  const [searchValue, setSearchValue] = useState(""); //значение поиска


  useEffect(() => {
    getListOfName("https://swapi.dev/api/people/?format=json").then((r) =>
      getAllList(r)
    );
    setLoading(false);
  }, []); //получение данных апи , прохождение по всему списку
  const getAllList = (data) => {
    data.results.forEach((item) => NAMES_ARR.push(item));
    data.next
      ? getListOfName(data.next).then((r) => getAllList(r))
      : setLoading(false);
    setDataName(NAMES_ARR);
  }; // получение всех имен
  const addLovely =  (love, index) => {
    let check = lovely.some(function (e) {
      return e.index === index;
    });
    if (!check) {
      setLovelyHero([...lovely, love]);
    }
  }; //добавление в избраное
  const filteredName = dataAll.filter((results) => {
    return results.name.toLowerCase().includes(searchValue.toLowerCase());
  });//фильтрация
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; //деление на список


  const NAMES_ARR = []; //массив имен
  const LAST__NAME_INDEX = currentPage * namesPerPage; // последний индекс списка
  const FIRST_ELEM_INDEX = lastNameIndex - namesPerPage; // первый индекс списка
  const CURRENT__NAME = dataAll.slice(FIRST_ELEM_INDEX, LAST__NAME_INDEX); //текущий список имен*/

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
                  loading={loading}
                  data={CURRENT__NAME}
                  addLovely={addLovely}
                  currentPage={currentPage}
                  setSearchValue={setSearchValue}
                  filteredName={filteredName}
                />
                <Pagination
                  namesPerPage={CURRENT__NAME}
                  totalNames={dataAll.length}
                  pagination={pagination}
                />
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
