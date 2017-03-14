import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

import SearchBox from './SearchBar.js'
import Hits from './Hits.js'
import FoodTypes from './FoodTypes.js'
import Ratings from './Ratings.js'
import PaymentOptions from './PaymentOptions.js'
import PriceRange from './PriceRange.js'

const appId = '8NX2UY9BJ3';
const apiKey = 'f1d54a8ba27d36e24e4f49a541f670c8';
const indexName = 'restaurants';

const client = algoliasearch(appId, apiKey);
const helper = algoliasearchHelper(
  client, indexName, {
    disjunctiveFacets: ['food_type', 'payment_options', 'stars_count', 'price_range'],
    hitsPerPage: 3,
    maxValuesPerFacet: 100
  }
);

helper.setQueryParameter('aroundLatLngViaIP', true).search();

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      filterCollapsed: false
    }

    this.handleClickFilter = this.handleClickFilter.bind(this);
  }

  handleClickFilter() {
    this.setState(prevState => ({
      filterCollapsed: !prevState.filterCollapsed
    }))
  }

  render() {
    return (
      <Provider helper={helper}>
            <div className='App__wrapper'>
                <div className='App__search-bar-container'>
                  <SearchBox />
                  <div className='Filter__container' onClick={this.handleClickFilter}>
                    Filter
                  </div>
                </div>

                <div className='App__main-container'>
                  <div className='App__side-bar'>
                    <FoodTypes parent='sidebar' />
                    <Ratings parent='sidebar' />
                    <PaymentOptions parent='sidebar' />
                    <PriceRange parent='sidebar' />
                  </div>

                  <div className={'App__dropdown-filter' + (this.state.filterCollapsed ? '--collapsed': '')}>
                    <FoodTypes parent='dropdown' />
                    <Ratings parent='dropdown' />
                    <PaymentOptions parent='dropdown' />
                    <PriceRange parent='dropdown' />
                  </div>

                  <div className='App__main-content' >
                    <Hits />
                  </div>

                </div>
            </div>
      </Provider>
    );
  }
}

export default App;
