import React from "react";
//credits to Traversy Media https://www.youtube.com/watch?v=IYCa1F-OWmk

interface PaginationProps {
  gamesPerPage: number;
  totalGames: number;
  paginate: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  gamesPerPage,
  totalGames,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number: number) => (
          <li key={number} className="page-item">
            <a href="#!" className="page-link" onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
