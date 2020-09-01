import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import "./Game.css";
import { Games } from "../../models/Games";

interface GameProps extends RouteComponentProps<{ id: string }> {}

export const Game: React.FC<GameProps> = ({ match }) => {
  const [game, setGame] = useState<Array<Games>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/${match.params.id}?fields=name,cover.url,summary,platforms.name,genres.name`,
      {
        method: "get",
        headers: new Headers({
          "user-key": `${process.env.REACT_APP_USER_KEY}`,
        }),
      }
    ).then(async (res) => {
      setLoading(true);
      const response = await res.json();
      setGame(response);
      setLoading(false);
    });
  }, [match.params.id]);

  const getNames = (field: Array<Object>) => {
    const names: string[] = [];
    field.map((x: any) => names.push(x.name));
    return names.toString().replace(/,/g, ", ");
  };

  const addToStorage = () => {
    const list = localStorage.getItem("gameList");
    if (!list) {
      const gameList: any = [];
      gameList.push({ ...game[0] });
      console.log(gameList);
      localStorage.setItem("gameList", JSON.stringify(gameList));
    } else {
      const gameList: any = JSON.parse(list);
      let index: number = -1;
      gameList.forEach((item: any, i: number) => {
        if (item.id === game[0].id) {
          index = i;
        }
      });
      if (index === -1) {
        gameList.push({ ...game[0] });
        localStorage.setItem("gameList", JSON.stringify(gameList));
      }
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      {game.map((game: Games) => (
        <div className="game-container" key={game.id}>
          <div className="game-image">
            <img
              src={game.cover.url.replace("t_thumb", "t_cover_big")}
              alt=""
            />
          </div>
          <div className="game-descriptions">
            <div className="game-name">
              <h3>{game.name}</h3>
            </div>
            <div className="game-genres">
              <b>Genres: </b>
              {getNames(game.genres)}
            </div>
            <div className="game-platforms">
              <b>Platforms: </b>
              {getNames(game.platforms)}
            </div>
            <div className="game-summary">
              <b>Summary: </b>
              <p>{game.summary}</p>
            </div>
            <button className="game-add-button" onClick={addToStorage}>
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
