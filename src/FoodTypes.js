import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

/*class FoodType extends Component {
  constructor(){
    super();

    this.state = {

    }

    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

  }

  render() {
    return (
      <li style={foodTypeListStyle}>
          <p
            style={this.props.isRefined ? foodTypeSelectedStyle : foodTypePlainStyle}
            checked={this.props.isRefined}
            value={this.props.name}
            onClick={this.props.handleClick}
          >
            {this.props.name}{' '}
            </p>
          <p style={countStyle}>{this.props.count}</p>
      </li>
    );
  }
}*/


const FoodType = ({name, count,isRefined, handleClick}) =>
<li className={"FilterMenu__list-item" + (isRefined ? '--selected' : '')}
  onClick={handleClick}>
    <span className={"FilterMenu__list-name" + (isRefined ? '--selected' : '')}>
      {name}{' '}
    </span>
    <span className={"FilterMenu__list-result-count" + (isRefined ? '--selected' : '')}>
      {count}
    </span>
</li>

const FoodTypes = ({foodTypes, helper}) => {
  return (
  <div className='FilterMenu'>
    <div className='FilterMenu__heading'>Cuisine/Food Type</div>
    <ul className="FilterMenu__list-container">
      {foodTypes.map(
        foodType =>
          <FoodType
            key={foodType.name}
            {...foodType}
            handleClick={e => helper.toggleRefine('food_type', foodType.name).search()}
          />
      )}
    </ul>
  </div>);
}

//Func = ({a}) =>
// connect(state: {a: b}))(Func)
const ConnectedFoodTypes = connect(
  state => ({
    foodTypes: state.searchResults &&
      state.searchResults.getFacetValues('food_type', {sortBy: ['count:desc', 'selected']}) ||
      []
  })
)(FoodTypes);

export default ConnectedFoodTypes;
