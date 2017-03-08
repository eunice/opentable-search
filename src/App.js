import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

import { Col } from 'react-bootstrap';

// import logo from './logo.svg';
import './App.css';
import SearchBox from './SearchBar.js'
import Pagination from './Pagination.js'
import Hits from './Hits.js'
import FoodTypes from './FoodTypes.js'
import Ratings from './Ratings.js'
import PaymentOptions from './PaymentOptions.js'

const appId = '8NX2UY9BJ3';
const apiKey = 'f1d54a8ba27d36e24e4f49a541f670c8';
const indexName = 'restaurants';

const client = algoliasearch(appId, apiKey);
const helper = algoliasearchHelper(
  client, indexName, {
    disjunctiveFacets: ['food_type', 'payment_options', 'stars_count'],
    hitsPerPage: 10,
    maxValuesPerFacet: 10
  }
);

console.log(helper)

helper.search();

class App extends Component {
  render() {
    return (
      <Provider helper={helper}>
          <div className="app">
              <SearchBox />
              <Col xs={4} md={3}>
                <FoodTypes />
                <Ratings />
                <PaymentOptions />
              </Col>
              <Col xs={8} md={9}>
                <Hits />
                <Pagination />
              </Col>
          </div>
      </Provider>
    );
  }
}

export default App;
