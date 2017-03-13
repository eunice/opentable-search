import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { connect } from 'react-algoliasearch-helper';

const ShowMore = connect(
  ({searchResults}) => (
    searchResults === null ?
      {page: 0, nbPages: 0} :
      {page: searchResults.page, nbPages: searchResults.nbPages}
  )
)(
  ({page, nbPages, helper, handleClick}) =>
  <div className="ShowMore__container">
    <button className="ShowMore__button" onClick={handleClick}>
      Show More
    </button>
  </div>
);

export default ShowMore;