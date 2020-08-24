import React from "react";
import { Games } from "../../models/Games";
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
          <img src={game.cover.url.replace("t_thumb", "t_cover_big")} alt="" />
        </div>
      ))}
    </div>
  );
};
