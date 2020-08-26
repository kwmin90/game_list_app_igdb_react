import React from "react";
import { SearchBox } from "./SearchBox/SearchBox";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link className="home" to="/">
            Game List App
          </Link>
        </li>
        <li className="search-box">
          <SearchBox />
        </li>
      </ul>
    </nav>
  );
};
