import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';
// import logo from './logo.svg';
import './App.css';
import SearchBox from './SearchBar.js'

const appId = '8NX2UY9BJ3';
const apiKey = 'f1d54a8ba27d36e24e4f49a541f670c8';
const indexName = 'restaurants';

// const appId = 'latency';
// const apiKey = '6be0576ff61c053d5f9a3225e2a90f76';
// const indexName = 'bestbuy';

const client = algoliasearch(appId, apiKey);
const helper = algoliasearchHelper(
  client, indexName, {
    disjunctiveFacets: ['food_type'],
    hitsPerPage: 10,
    maxValuesPerFacet: 3
  }
);

console.log(helper)

// console.log(helper.setQuery('ar').search())

const getHighlighted = s => ({__html: s});

const Hit = ({
  _highlightResult: {
    name: {
      value: name
    }
  }
}) => <div dangerouslySetInnerHTML={getHighlighted(name)}/>;


const Hits = connect(
  state => ({results: state.searchResults})
)(
  ({results}) => results &&
  <div className="results">
    {results.hits.map(hit => <Hit key={hit.objectID} {...hit} />)}
  </div>
);

const Category = ({
  name,
  count,
  isRefined,
  handleClick
}) =>
<li>
  <label>
    <input
      type="checkbox"
      checked={isRefined}
      value={name}
      onChange={handleClick}
    />
    {name}{' '}
    <span className="badge">{count}</span>
  </label>
</li>;


// connect(state: {}))
const Categories = connect(
  state => ({
    categories: state.searchResults &&
      state.searchResults.getFacetValues('food_type', {sortBy: ['count:desc', 'selected']}) ||
      []
  })
)(
  ({categories, helper}) => {
    console.log(categories)
return (<ul className="categories">
  {categories.map(
    category =>
      <Category
        key={category.name}
        {...category}
        handleClick={e => helper.toggleRefine('category', category.name).search()}
      />
  )}
</ul>)
  }
);

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

helper.search();

class App extends Component {
  render() {
    return (
      <Provider helper={helper}>
          <div className="app">
              <SearchBox />
              <Categories />
              <Hits />
              <Pagination />
          </div>
      </Provider>
    );
  }
}

export default App;
