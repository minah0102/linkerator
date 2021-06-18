import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';

//import { getSomething } from '../api';

import { 
  SearchBar,
  //SearchResults
  LinkList, 
   }  from "./components";



const App = () => {
  return (
    <div>
      <h1>Linkerator</h1>
      <SearchBar />
      {/*<SearchResults />
      */}
      <LinkList />{/*LinkList includes NewLinkForm*/}
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);