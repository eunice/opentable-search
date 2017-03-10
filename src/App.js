import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

import { Col, Grid, Row } from 'react-bootstrap';

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

// console.log(helper)
const main = {
  height: 'inherit'
}
helper.search();

class App extends Component {
  render() {
    return (
      <Provider helper={helper}>
          <div style={searchContainerStyle}>
              <div style={searchBarStyles}>
                <SearchBox />
              </div>
              <div style={main}>
                <Col xs={2} md={3} style={sidebar}>
                  <FoodTypes />
                  <Ratings />
                  <PaymentOptions />
                </Col>
                <Col xs={10} md={9} style={mainContent}>
                  <Hits />
                  <Pagination />
                </Col>
              </div>
          </div>
      </Provider>
    );
  }
}

const searchContainerStyle = {
  width: '80%',
  height: '580px',
  overflow: 'hidden',
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  margin: 'auto'
}

const sidebar = {
  height: 'inherit',
  overflow: 'scroll',
  borderRight: '1px solid',
  borderColor: '#E7E7E7',
  paddingTop: 10
}

const mainContent = {
  height: 'inherit',
  overflow: 'scroll'
}

const searchBarStyles = {
  clear: 'both',
  display: 'block',
  backgroundColor: '#1C688E',
  width: '100%',
  height: 'auto',
  position: 'relative'
}


export default App;
