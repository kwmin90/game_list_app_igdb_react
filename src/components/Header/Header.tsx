import React from "react";
import { Search } from "../Search";
import "./Header.css";

export const Header: React.FC = () => {
  return (
    <nav>
      <a className="home" href="#">
        Game List App
      </a>
      <div className="searchbar">
        <Search />
      </div>
    </nav>
  );
};
