import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect, AgAutocomplete } from 'react-algoliasearch-helper';
import { FormControl } from 'react-bootstrap';

class SearchBox extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.helper.setQuery(e.target.value).search();
  }

  render() {
    const currentHits = this.props.searching ? [] : this.props.currentHits;
    const hitList = [];
    if (this.props.currentHits && this.props.currentHits.length > 0 ) {
      const hit = currentHits.map((hit) => {
              return <li key={hit.objectID}>{hit.name}</li>
          });
      hitList.push(hit);
    }

    return (
      <div className='SearchBar__container'>
        <FormControl
          className='SearchBar__input'
          placeholder="Search for Restaurants by Name, Cuisine, Location"
          onChange={e => this.handleChange(e)}
          />        
      </div>
    );
  }
}

const ConnectedSearchBox = connect(state => ({
  searching: state.searching,
  currentPage: state.searchParameters.page,
  result: state.searchResults,
  currentHits: state.searchResults && state.searchResults.hits
}))(SearchBox);

export default ConnectedSearchBox;
