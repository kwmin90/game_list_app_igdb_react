import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Games } from "../../models/Games";
import { Pagination } from "../Pagination/Pagination";
import { SearchGameItem } from "./SearchGameItem/SearchGameItem";
import "./Search.css";

interface SearchProps extends RouteComponentProps<{ query: string }> {}

export const Search: React.FC<SearchProps> = ({ match }) => {
  const [games, setGames] = useState<Array<Games>>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(6);

  useEffect(() => {
    const token = localStorage.getItem('accessToken')?.slice(1,-1);
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/?search=${match.params.query}&fields=name,cover.url,summary,platforms.name,genres.name&limit=50`,
      {
        method: "POST",
        headers: {
          "Client-ID": `${process.env.REACT_APP_CLIENT_ID}`,
          'Accept': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      }
    )
      .then(async (res) => {
        setLoading(true);
        const response = await res.json();
        const newArray: any[] = [];
        response.forEach((game: any) => {
          if (game.cover && game.genres && game.platforms && game.summary) {
            newArray.push(game);
          }
        });
        newArray.sort((a, b) => a.name.localeCompare(b.name));
        setGames(newArray);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [match.params.query]);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games?.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="search-container">
      <SearchGameItem games={currentGames} loading={loading} />
      <div className="pagination">
        <Pagination
          gamesPerPage={gamesPerPage}
          totalGames={games.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};
