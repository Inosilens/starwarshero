
const getData = ()=>{
   return fetch("https://swapi.dev/api/people/?format=json").then(r=>
      r.json()
)



}

export default getData