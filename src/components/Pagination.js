import React from "react";

function Pagination({  pagination }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(82 /10); i++)
    pageNumbers.push(i);

  return (
    <div>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a href="#" onClick={() => pagination(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
