import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Game } from "./components/Game/Game";
import { Search } from "./components/Search/Search";
import { Header } from "./components/Header/Header";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="game_list_app_igdb_react/" component={Home} />
          <Route exact path="game_list_app_igdb_react/game/:id" component={Game} />
          <Route exact path="game_list_app_igdb_react/search/:query" component={Search} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
