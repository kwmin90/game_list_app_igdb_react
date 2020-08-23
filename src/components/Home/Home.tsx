import React, { useState, useEffect } from "react";

interface Games {
  id: number;
  name: string;
  cover: {
    url: string;
  };
  summary: string;
  platforms: [
    {
      name: string;
    }
  ];
  genres: [
    {
      name: string;
    }
  ];
}
export const Home: React.FC = () => {
  const [games, setGames] = useState<Array<Games>>();

  useEffect(() => {
    const defaultGames: number[] = [115, 114283];
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/${defaultGames}?fields=name,cover.url,summary,platforms.name,genres.name&limit=50`,
      {
        method: "get",
        headers: new Headers({
          "user-key": "key",
        }),
      }
    ).then(async (res) => {
      const response = await res.json();
      setGames(response);
      console.log(response);
    });
  }, []);
  return (
    <div>
      {games?.map((game: Games) => (
        <div key={game.id}>
          <img src={game.cover.url.replace("t_thumb", "t_cover_big")} alt="" />
        </div>
      ))}
    </div>
  );
};
