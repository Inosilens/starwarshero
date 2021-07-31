import React from "react";

function Pagination({ currentPage, setCurrentPage, lengthOfList }) {
    const paginationList = Math.ceil(lengthOfList / 10);
    return (
        <div>
            <ul>
                {paginationList &&
                [...Array(paginationList)].map((item, i) => (
                    <li key={i}>
                        <a
                            className={currentPage === i + 1 ? "active" : ""}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(i + 1);
                            }}
                        >
                            {i + 1}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pagination;
