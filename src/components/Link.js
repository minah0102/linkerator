import React /*, { useState }*/ from "react";

import "./Link.css";

//need an onClick to open a new window

const Link = ({ link, num }) => {
  return (

    //in the <a> tag, need to make href=the link
    //tags should be similar to LinkList.js lines for mapping over the links
    <div className="Link">
      <div>
        {num}. <a href={link.url}>{link.url}</a>
      </div>
      <div>clicked: {link.count} times</div>
      <div>comments: {link.comment}</div>
      <div>tags: </div>
      {/*<links.map((l, idx) => {
        return <Link key={l.id} link={l} num={idx + 1} setLinks={setLinks} />;
      })}
      <NewLinkForm setLinks={setLinks} />
    </div>*/}
    </div>
  );
};

export default Link;

