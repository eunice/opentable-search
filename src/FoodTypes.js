import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

const FoodType = ({
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
const FoodTypes = connect(
  state => ({
    foodTypes: state.searchResults &&
      state.searchResults.getFacetValues('food_type', {sortBy: ['count:desc', 'selected']}) ||
      []
  })
)(
  ({foodTypes, helper}) => {
    console.log(foodTypes)
return (<ul className="foodTypes">
  {foodTypes.map(
    foodType =>
      <FoodType
        key={foodType.name}
        {...foodType}
        handleClick={e => helper.toggleRefine('food_type', foodType.name).search()}
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

export default FoodTypes;
