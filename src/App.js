import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import HeroList from "./components/HeroList";
import LovelyHero from "./components/LovelyHero";
import Pagination from "./components/Pagination";
import { getListOfName } from "./services/getListOfName";

function App() {
  const [dataName, setDataName] = useState([]); //массив данных
  const [lovely, setLovelyHero] = useState([]); //массив избраных
  const [loading, setLoading] = useState(false); //загрузка
  const [currentPage, setCurrentPage] = useState(1); //текущая страница
  const [namesPerPage] = useState(10); // количество выводимое на страницу
  const [searchValue, setSearchValue] = useState(""); //значение поиска

  useEffect(() => {
    getListOfName().then((r) => getAllList(r));
    setLoading(false);
  }, []); //получение данных апи , прохождение по всему списку

  const getData = (url) => {
    fetch(url).then((r) =>
      r
        .json()
        .then((r) => getAllList(r))
        .catch((e) => console.log(e))
    );
  };

  const namesArr = []; //массив имен

  const getAllList = (data) => {

    data.results.forEach((item,index)=>namesArr.push(item.name))


    if (data.next) {
      getData(data.next);
    } else {
      setLoading(false);
    }

    setDataName(namesArr);
  }; // получение всех имен

  const addLovely = async (love, index) => {
    let check = lovely.some(function (e) {
      return e.index === index;
    });
    if (!check) {
      setLovelyHero([...lovely, { love, index }]);
    }
  }; //добавление в избраное
  /* const filteredName = dataName.filter((name) => {
    return name.toLowerCase().includes(searchValue.toLowerCase());*/
  /*});*/ //филтрация по имени
  const lastNameIndex = currentPage * namesPerPage; // последний индекс списка
  const firstElemIndex = lastNameIndex - namesPerPage; // первый индекс списка
  const currentName = dataName.slice(firstElemIndex, lastNameIndex); //текущий список имен*/
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; //деление на список
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
                  /* filteredName={filteredName}*/
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
