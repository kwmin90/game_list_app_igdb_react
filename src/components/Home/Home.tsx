import React, { useState, useEffect } from "react";
import axios from 'axios';
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
    const queryGames = async()=>{
      const token = localStorage.getItem('accessToken')?.slice(1,-1);
      const res = await axios({
        url: 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games',
        method: "POST",
        headers: {
          "Client-ID": `${process.env.REACT_APP_CLIENT_ID}`,
          'Accept': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        data: `fields name,cover.url,summary,platforms.name,genres.name;limit 50;where id=(${defaultGames});`,
      }
    )
    return res.data;
    }

    const list = localStorage.getItem("gameList");
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) getAccessToken();
    if(!list) {
      queryGames()
      .then(async (res)=>{
        setLoading(true);
        const response = await res;
        setGames(response);
        setLoading(false);
      });
    } else {
      setGames(JSON.parse(list));
    }
  }, [defaultGames]);

  const getAccessToken = () => {
    fetch(`https://cors-anywhere.herokuapp.com/https://id.twitch.tv/oauth2/token?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&grant_type=client_credentials`,
    {
      method: "POST"
    }).then(async (res)=>{
      const data = await res.json();
      localStorage.setItem('accessToken', JSON.stringify(data.access_token));
    })
  }

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
