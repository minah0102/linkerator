import React, { useState } from "react";

//below is mostly from deckbuilder react
//this is mostly placeholder/needs work

import { getSomething } from "../api";

const SearchBar = ({ setResults }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const cards = await getSomething({
      name,
      text,
    });

    setResults(cards);
  }

  return (
    <div id="search">
      <h3>Search by Link or Tag</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="link"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="tag"
          value={text}
          onChange={handleTextChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
