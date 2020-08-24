import React from "react";
import { Search } from "../Search/Search";
import "./Header.css";

export const Header: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <a className="home" href="/">
            Game List App
          </a>
        </li>
        <li className="search">
          <Search />
        </li>
      </ul>
    </nav>
  );
};
