import React, { useState, useEffect } from "react";
import { Games } from "../../models/Games";
import { GameItem } from "./GameItem/GameItem";
import { Pagination } from "../Pagination/Pagination";
import "./Home.css";

export const Home: React.FC = () => {
  const [games, setGames] = useState<Array<Games>>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(8);
  const [defaultGames] = useState([
    115,
    114283,
    1443,
    76816,
    40477,
    26845,
    24220,
    7323,
    37777,
    1164,
    9740,
    9498,
    11169,
    2449,
    359,
    384,
    389,
    1121,
    19441,
    1520,
    19131,
    23441,
    115989,
    23865,
  ]);

  useEffect(() => {
    const list = localStorage.getItem("gameList");
    if (!list) {
      fetch(
        `https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/${defaultGames}?fields=name,cover.url,summary,platforms.name,genres.name&limit=50`,
        {
          method: "get",
          headers: new Headers({
            "user-key": `${process.env.REACT_APP_USER_KEY}`,
          }),
        }
      ).then(async (res) => {
        setLoading(true);
        const response = await res.json();
        setGames(response);
        setLoading(false);
      });
    } else {
      setGames(JSON.parse(list));
    }
  }, [defaultGames]);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games?.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="App">
      <div className="home-container">
        <GameItem games={currentGames} loading={loading} />
        <div className="pagination">
          <Pagination
            gamesPerPage={gamesPerPage}
            totalGames={games.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};
