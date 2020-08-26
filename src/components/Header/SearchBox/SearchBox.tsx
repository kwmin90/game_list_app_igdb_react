import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SearchBox.css";

export const SearchBox: React.FC = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const submit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      history.push(`/search/${query}`);
      setQuery("");
    }
  };
  return (
    <input
      type="text"
      className="searchbox"
      placeholder="Search your favorite game!"
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => submit(e)}
    />
  );
};
