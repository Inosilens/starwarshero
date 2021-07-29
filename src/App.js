import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import HeroList from "./components/HeroList";
import LovelyHero from "./components/LovelyHero";
import Pagination from "./components/Pagination";

function App() {
  const [dataName, setDataName] = useState([]);
  const [lovely, setLovelyHero] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [namesPerPage] = useState(10);
  const [searchValue,setSearchValue]=useState("")

  useEffect(() => {
    getData("https://swapi.dev/api/people/?format=json");
    setLoading(false);
  }, []);

  const getData = (url) => {
    fetch(url).then((r) => r.json().then((r) => getAllList(r)));
  };

  const namesArr = [];

  const getAllList = (data) => {
    setLoading(true);
    for (let i = 0; i < data.results.length; i++)
      namesArr.push(data.results[i]);
    console.log(namesArr);
    if (data.next) {
      getData(data.next);
    } else {
      setLoading(false);
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

  const filteredName = dataName.filter(name=>{
    return name.name.toLowerCase().includes(searchValue.toLowerCase())
  })
  const lastNameIndex = currentPage * namesPerPage;
  const firstElemIndex = lastNameIndex - namesPerPage;
  const currentName = dataName.slice(firstElemIndex, lastNameIndex);
  const pagination = (pageNumber) => {

    setCurrentPage(pageNumber);
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
            render={() => <LovelyHero lovelyList={lovely} />}
          />
        </Switch>
      </Router>

    </>
  );
}

export default App;
