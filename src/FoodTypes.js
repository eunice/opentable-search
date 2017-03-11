import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

import { Col, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';


const headingStyle = {
  fontSize: '110%'
}

const listStyle = {
  listStyle: 'none',
  paddingLeft: '10'
}

const foodTypeListStyle = {
  clear: 'both', 
  backgroundColor: 'blue'
}

const foodTypeStyle = {
  float: 'left',
  margin: '0 0 0px',
  color: 'black'
}

const countStyle = {
  float: 'right',
  margin: '0 0 1px'
}

const FoodType = ({
  name,
  count,
  isRefined,
  handleClick
}) =>
<li style={foodTypeListStyle}>
    <p 
      style={foodTypeStyle}
      checked={isRefined}
      value={name}
      onClick={handleClick}
    >
      {name}{' '}
      </p>
    <p style={countStyle}>{count}</p>
</li>;


/*<li style={{clear: 'both'}}>
    <input
      type="checkbox"
      checked={isRefined}
      value={name}
      onChange={handleClick}
    />
      {name}{' '}
      </p>
    <p style={countStyle}>{count}</p>
</li>;*/


// connect(state: {}))
const FoodTypes = connect(
  state => ({
    foodTypes: state.searchResults &&
      state.searchResults.getFacetValues('food_type', {sortBy: ['count:desc', 'selected']}) ||
      []
  })
)(
  ({foodTypes, helper}) => {
    // console.log(foodTypes)
    
return (<div><div style={headingStyle}>Cuisine/Food Type</div>
  <ul className="foodTypes" style={listStyle}>
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
