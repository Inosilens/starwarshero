import React from "react";

function Pagination({ currentPage, setCurrentPage, lengthOfList }) {
    const paginationList = Math.ceil(lengthOfList / 10);
    return (
        <div>
            <ul className="pagination">
                {paginationList &&
                [...Array(paginationList)].map((item, i) => (
                    <li className="page-item" aria-current="page" key={i}>
                        <a
                            className={currentPage === i + 1 ? "active page-link" : "page-link"}
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
