export const searchName = (url) =>
    fetch(url).then((r) => r.json())