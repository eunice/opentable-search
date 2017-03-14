import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

// import logo from './logo.svg';
// import './App.css';
import SearchBox from './SearchBar.js'
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
    hitsPerPage: 3,
    maxValuesPerFacet: 100
  }
);

/**
 * ToDO:
 * 
 * custom sorting function!!!
 * USE GULP!! 
 *
 * mobile - autocomplete + Search? 
 * 
 * When mobile responsive --> search bar placeholder content should '....'
 * 
 * when select stars, grey out background!
 * stars --> filled according to Ratings
 * Open up "opentable page" when clicked
 * 
 * 
 * filter -- city / dining style / price_range
 * show restaurant details (phone, address, map, price, image, reserve)
 * 
 * make 'show more' button not appear before results load
 * search bar
 * 
 * documentation for Project:::::::
 * API Usage
 * CSS 
 * Webpack 
 * Mobile 
 * React/Redux - code organization 
 * 
 * 
 * 
 * don't hardcode API config!!

Follow up later:
 * RERUN SCRIPT --> Diners Club and Carte Blanche are Discover cards
 * Check with Algolia if JCB + Pay with OT
 * infinite scroll (see more)
 * make cuisine list scrollable
 * hover --> cuisine list + payment payment_options
 * basic alignment / spacing (sidebar
 * responsive (tablet + mobile view)
 * Fix "SHOW MORE" main content height (when responsive)
 * Don't "SHOW MORE" when there's no more to show
 * show user's location --> show restaurants closer to them higher in result
 * hits ordered by rating
 * 
Future Improvements
 * get additional elements (not get next page)
 */

// navigator.geolocation.getCurrentPosition(function(position) {
//   console.log('pos',position.coords.latitude, position.coords.longitude);
// });
// ()
// console.log(helper)

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
                  </div>

                  <div className={'App__dropdown-filter' + (this.state.filterCollapsed ? '--collapsed': '')}>
                    <FoodTypes parent='dropdown' />
                    <Ratings parent='dropdown' />
                    <PaymentOptions parent='dropdown' />
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
