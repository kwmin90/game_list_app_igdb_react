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
          <Route exact path="/" component={Home} />
          <Route exact path="/game/:id" component={Game} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
