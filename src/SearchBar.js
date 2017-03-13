import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

import { FormControl } from 'react-bootstrap';

// onClick={handleClick}
const SearchBox = connect()(
  ({helper}) =>
  <div className='SearchBar__container'>
    <FormControl
      className='SearchBar__input'
      placeholder="Search for Restaurants by Name, Cuisine, Location"
      onChange={e => helper.setQuery(e.target.value).search()}
      />
    <div 
      className='Filter__container' 
      >
      Filter
    </div>
  </div>
);

export default SearchBox;
