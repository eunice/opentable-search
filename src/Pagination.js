import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

const Pagination = connect(
  ({searchResults}) => (
    searchResults === null ?
      {page: 0, nbPages: 0} :
      {page: searchResults.page, nbPages: searchResults.nbPages}
  )
)(
  ({page, nbPages, helper}) =>
  <div className="pager">
    <button className="previous" onClick={e => helper.setPage(page - 1).search()} disabled={page === 0}>Previous</button>
    <span className="current-page">
      {page + 1}
    </span>
    <button className="next" onClick={e => helper.setPage(page + 1).search()} disabled={page + 1 >= nbPages}>Next</button>
  </div>
);

/*class SearchBar extends Component {
  render() {
    return (
      <div className="SearchBar">
         <input type="text" autocomplete="off" id="search-box"/>
      </div>
    );
  }
}*/

export default Pagination;
