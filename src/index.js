import React /*, { useEffect, useState }*/ from "react";
import ReactDOM from 'react-dom';

//import { getSomething } from '../api';

import { 
  SearchBar,
  //SearchResults
  LinkList, 
   }  from "./components";



const App = () => {
{/*
  const [linkList, setLinkList] = useState([]);
  const [, setUserRoutines] = useState([]);

  useEffect(() => {
    getLinks()
      .then((links) => {
        setLinkList(links);
      })
      .catch((error) => {
        console.error(error)
      });
  }, []);
*/}

  return (
    <div>
      <SearchBar />
      {/*<SearchResults />
      */}
      <LinkList />{/*LinkList includes NewLinkForm*/}
      {/* //something like this should go in LinkList?
        link={link}
        addLinkToList={addLinkToList}
      */}
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);