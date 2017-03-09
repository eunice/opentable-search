import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

const searchContainerStyle = {
  backgroundColor: 'blue'
}

const searchStyle = {
  width: '100%',
  padding: '0.5em 1em'
}

const SearchBox = connect()(
  ({helper}) =>
  <div style={searchContainerStyle}>
    <input
      style={searchStyle}
      placeholder="Search for Restaurants by Name, Cuisine, Location"
      onChange={e => helper.setQuery(e.target.value).search()}
      />
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

export default SearchBox;
