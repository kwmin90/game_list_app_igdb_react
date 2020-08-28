import React from "react";
import { Games } from "../../../models/Games";
import { Link } from "react-router-dom";
import "./SearchGameItem.css";

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
  const getNames = (field: Array<Object>) => {
    const names: string[] = [];
    field.map((x: any) => names.push(x.name));
    return names.toString().replace(/,/g, ", ");
  };
  return (
    <div>
      {games.map((game: Games) => (
        <div className="searched-games" key={game.id}>
          <div className="searched-game-image">
            <img
              src={game.cover.url.replace("t_thumb", "t_cover_small")}
              alt=""
            />
          </div>
          <div className="searched-game-description">
            <Link to={`/game/${game.id}`}>{game.name}</Link>
            <p>{getNames(game.platforms)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
