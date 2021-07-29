import React from 'react';

function Pagination({namesPerPage, totalNames, pagination }) {
    const pageNumber = []

    for (let i = 1; i < Math.ceil(totalNames/namesPerPage);i++)
    {
        pageNumber.push(i)
    }
    return (
        <div>
            <ul>
                {pageNumber.map(number=>

                    <li onClick={()=>pagination(number)}>{number}</li>
                )}
            </ul>
        </div>
    );
}

export default Pagination;