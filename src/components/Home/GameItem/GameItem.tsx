import React from "react";
import { Games } from "../../../models/Games";
import { Link } from "react-router-dom";
import "./GameItem.css";

interface GameItemProps {
  games: Games[];
  loading: boolean;
}

export const GameItem: React.FC<GameItemProps> = ({ games, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="games">
      {games.map((game: Games) => (
        <div className="game-item" key={game.id}>
          <Link to={`/game/${game.id}`}>
            <img
              src={game.cover.url.replace("t_thumb", "t_cover_big")}
              alt=""
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
