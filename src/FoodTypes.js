import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

class FoodTypes extends Component {
  constructor(props){
    super(props);

    this.state = {
      isCollapsed: false
    }

    this.handleClickListItem = this.handleClickListItem.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  handleCollapse() {
    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed
    }))
  }

  handleClickListItem(foodType) {
    this.props.helper.toggleRefine('food_type', foodType.name).search()
  }  

  render() {
    let classMenu = this.props.parent == 'sidebar' ? 'FilterMenu' : 'DropdownMenu';

    return (
      <div className={classMenu}>
          <div 
            className={classMenu + '__heading'}
            onClick={this.handleCollapse}
            >
            Cuisine/Food Type
          </div>
          <ul className={classMenu + "__list-container" + (this.state.isCollapsed ? '--collapse' : '')}>
            {this.props.foodTypes.map(
              foodType =>
                <FoodType
                  key={foodType.name}
                  classMenu={classMenu}
                  {...foodType}
                  handleClick={e => this.handleClickListItem(foodType)}
                />
            )}
          </ul>
      </div>
    );
  }
}


const FoodType = ({name, count, isRefined, classMenu, handleClick}) => {
  return (
    <li className={ classMenu + "__list-item" + (isRefined ? '--selected' : '')}
      onClick={handleClick}>
        <span className={ classMenu + "__list-name" + (isRefined ? '--selected' : '')}>
          {name}{' '}
        </span>
        <span className={ classMenu + "__list-result-count" + (isRefined ? '--selected' : '')}>
          {count}
        </span>
    </li>
  );
}

/*const FoodTypes = ({foodTypes, helper, parent}) => {
  let classMenu = parent == 'sidebar' ? 'FilterMenu' : 'DropdownMenu';

  return (
    <div className={classMenu}>
        <div 
          className={classMenu + '__heading'}
          onClick={}
          >
          Cuisine/Food Type
        </div>
        <ul className={classMenu + "__list-container"}>
          {foodTypes.map(
            foodType =>
              <FoodType
                key={foodType.name}
                classMenu={classMenu}
                {...foodType}
                handleClick={e => helper.toggleRefine('food_type', foodType.name).search()}
              />
          )}
        </ul>
    </div>
  );
}*/

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
