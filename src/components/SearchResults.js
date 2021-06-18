//below is all from deckbuilder react

//uncomment
// import React from "react";

// import Card from "./Card";

// import "./SearchResults.css";

//leave commented out
//this has been updated below
//leaving it in commented out for future reference
//old, updated below
// const SearchResults = ({ results }) => {
//   return (
//     <div id="results">
//       <h3>
//         Here's what we found ({ results.length } results):
//       </h3>
//       <div className="CardList">
//         {
//           results.map(result => (
//             <Card key={ result.id } {...result} />
//           ))
//         }
//       </div>
//     </div>
//   );
// }

//uncomment
//UPDATED
// const SearchResults = ({ results, addLinkToList }) => {
//   return (
//     <div id="results">
//       <h3>We found ({results.length} links matching that description.</h3>
//       <div className="LinkList">
//         {results.map((result) => (
//           <Link
//             key={result.id}
//             addLinkToList={addLinkToList}
//             {...result}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;
