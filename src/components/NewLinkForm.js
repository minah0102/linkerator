import React, { useState } from "react";

import "./NewLinkForm.css";

const NewLinkForm = ({setLinks}) => {
  const [linkVal, setLinkVal] = useState("");

  const handleInputChange = (e) => {
    setLinkVal(e.target.value);
  };

//need to add/fix url click count, tags and comments
  const handleSubmit = (e) => {
    e.preventDefault();
    const newLink = {
        url: linkVal,
        count: "0",
        comment: "",
        date: "",
        tags: ["?", "?"],
        id: linkVal + Date.now()
    }
    setLinks((currentLinks) => {
      return [...currentLinks, newLink];
    });
    setLinkVal("");
  };

  return (
    <div id="add-link">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="                Paste a new link here"
          value={linkVal}
          onChange={handleInputChange}
        />
        <button type="submit">Add This Link to Linkerator</button>
      </form>
    </div>
  );
};

export default NewLinkForm;
