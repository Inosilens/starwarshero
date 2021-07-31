export const getListOfName =(url) =>
fetch(url).then((r) => r.json())