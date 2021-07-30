import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import HeroList from "./components/HeroList";
import LovelyHero from "./components/LovelyHero";
import Pagination from "./components/Pagination";

function App() {
  const [dataName, setDataName] = useState([]); //массив данных
  const [lovely, setLovelyHero] = useState([]); //массив избраных
  const [loading, setLoading] = useState(false); //загрузка
  const [currentPage, setCurrentPage] = useState(1); //текущая страница
  const [namesPerPage] = useState(10); // количество выводимое на страницу
  const [searchValue, setSearchValue] = useState(""); //значение поиска

  useEffect(() => {
    getData("https://swapi.dev/api/people/?format=json");
    setLoading(false);
  }, []); //получение данных апи , прохождение по всему списку

  const getData = (url) => {
    fetch(url).then((r) => r.json().then((r) => getAllList(r)));
  };

  const namesArr = []; //массив имен

  const getAllList = (data) => {
    setLoading(true);
    for (let i = 0; i < data.results.length; i++)
      namesArr.push(data.results[i]);
    if (data.next) {
      getData(data.next);
    } else {
      setLoading(false);
    }

    setDataName(namesArr);
  }; // получение всех имен

  const addLovely = (love, index) => {
    let check = lovely.some(function (e) {
      return e.index === index;
    });
    if (!check) {
      setLovelyHero([...lovely, { love, index }])
      localStorage.setItem(index,love.name);

    }
  }; //добавление в избраное

  const filteredName = dataName.filter((name) => {
    return name.name.toLowerCase().includes(searchValue.toLowerCase());
  }); //филтрация по имени
  const lastNameIndex = currentPage * namesPerPage; // последний индекс списка
  const firstElemIndex = lastNameIndex - namesPerPage; // первый индекс списка
  const currentName = filteredName.slice(firstElemIndex, lastNameIndex); //текущий список имен
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };//деление на список
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
                  data={currentName}
                  addLovely={addLovely}
                  currentPage={currentPage}
                  setSearchValue={setSearchValue}
                  filteredName={filteredName}
                />
                <Pagination
                  namesPerPage={currentName}
                  totalNames={dataName.length}
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
