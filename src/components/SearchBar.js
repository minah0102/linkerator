import React, { useState } from "react";

import "./SearchBar.css";

//below is mostly from deckbuilder react
//this is mostly placeholder/needs work

import { getSomething } from "../api";

const SearchBar = ({ setResults }) => {
  const [link, setLink] = useState("");
  const [tag, setTag] = useState("");

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const links = await getSomething({
      link,
      tag,
    });

    setResults(links);
  }

  return (
    <div>
    <div class="search">
    <div id="search-links">
      <form class="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="         search links"
          value={link}
          onChange={handleLinkChange}
        />
        <button type="submit">Search</button>
        </form>
    </div>
    <div id="search-tags">
        <form class="search-form" onSubmit={handleSubmit}>
        <button type="submit">Search</button>
        <input
          type="text"
          placeholder="         search tags"
          value={tag}
          onChange={handleTagChange}
        />
      </form>
    </div>
    </div>
    </div>
  );
};

export default SearchBar;
