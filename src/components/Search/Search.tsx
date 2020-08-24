import React from "react";
import "./Search.css";

export const Search: React.FC = () => {
  return (
    <input
      type="text"
      className="searchbox"
      placeholder="Search your favorite game!"
    />
  );
};
