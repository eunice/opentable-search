import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

import { Col, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

/*const FoodType = ({
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
</li>;*/

const FoodType = ({
  name,
  count,
  isRefined,
  handleClick
}) =>
  <div onClick={handleClick}>
    {name}{' '}
    <span >{count}</span>
  </div>;


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
return (<div><div><b>Cuisine/Food Type</b></div>
  <ul className="foodTypes">
  {foodTypes.map(
    foodType =>
      <FoodType
        key={foodType.name}
        {...foodType}
        handleClick={e => helper.toggleRefine('food_type', foodType.name).search()}
      />
  )}
</ul></div>)
  }
);

export default FoodTypes;
