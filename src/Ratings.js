import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

const Rating = ({
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
const Ratings = connect(
  state => ({
    ratings: state.searchResults &&
      state.searchResults.getFacetValues('stars_count', {sortBy: ['count:desc', 'selected']}) ||
      []
  })
)(
  ({ratings, helper}) => {
    console.log(ratings)
return (<ul className="ratings">
  {ratings.map(
    rating =>
      <Rating
        key={rating.name}
        {...rating}
        handleClick={e => helper.toggleRefine('stars_count', rating.name).search()}
      />
  )}
</ul>)
  }
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

export default Ratings;
