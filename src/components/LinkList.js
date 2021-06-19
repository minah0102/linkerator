import React, { useEffect, useState } from "react";

import Link from "./Link";

import "./LinkList.css";

import NewLinkForm from "./NewLinkForm"

//need a call to our API here, to get the links from our API

const LinkList = () => {
  const [links, setLinks] = useState([]);

  return (
    <div>
      <NewLinkForm setLinks={setLinks} />
      <h2>THE LINKS</h2>
      {links.map((l, idx) => {
        return <Link key={l.id} link={l} num={idx + 1} setLinks={setLinks} />;
      })}
    </div>
  );
};

export default LinkList;
