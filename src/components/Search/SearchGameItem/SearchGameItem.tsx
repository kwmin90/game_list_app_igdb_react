import React from "react";
import { Games } from "../../../models/Games";
import { Link } from "react-router-dom";

interface SearchGameItemProps {
  games: Games[];
  loading: boolean;
}

export const SearchGameItem: React.FC<SearchGameItemProps> = ({
  games,
  loading,
}) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="searched-games">
      {games.map((game: Games) => (
        <div className="searched-game" key={game.id}>
          <div className="searched-game-image">
            <img
              src={game.cover.url.replace("t_thumb", "t_cover_big")}
              alt=""
            />
          </div>
          <div className="searched-game-name">
            <Link to={`/game/${game.id}`}>{game.name}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};
