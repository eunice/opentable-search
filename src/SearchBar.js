import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

const SearchBox = connect()(
  ({helper}) =>
  <input
    className="search-box"
    placeholder="Search here"
    onChange={e => helper.setQuery(e.target.value).search()}
  />
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

export default SearchBox;
