import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { connect } from 'react-algoliasearch-helper';

const ShowMore = ({page, nbPages, helper, handleClick}) => {
  return <div className={"ShowMore__container" + (page + 1 >= nbPages ? '--hide': '')}>
    <button className="ShowMore__button" onClick={handleClick}>
      Show More
    </button>
  </div>;
}
  

const ConnectedShowMore = connect(
  ({searchResults}) => (
    searchResults === null ?
      {page: 0, nbPages: 0} :
      {page: searchResults.page, nbPages: searchResults.nbPages}
  )
)(ShowMore);

export default ConnectedShowMore;