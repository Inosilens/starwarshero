export const getListOfName =() =>
fetch("https://swapi.dev/api/people/?format=json").then((r) => r.json())