import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

import { Col, Grid, Row, Image, FormControl } from 'react-bootstrap';

const searchContainerStyle = {
  position: 'relative',
  padding: 18,
  margin: '0 auto',
  width: 'auto',
  height: 'auto'
}

const searchStyle = {
  width: '100%',
  borderRadius: '2px'
}

const SearchBox = connect()(
  ({helper}) =>
  <div style={searchContainerStyle}>
    <FormControl
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
