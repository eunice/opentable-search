import React, { PropTypes, Component } from 'react';
import reactAlgoliaSearchHelper, { connect } from 'react-algoliasearch-helper';
import FoodType from './FoodType.js'

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

FoodTypes.PropTypes = {
  helper: PropTypes.object.isRequired,
  parent: PropTypes.string.isRequired,
  foodTypes: PropTypes.array
}

const ConnectedFoodTypes = connect(
  state => ({
    foodTypes: state.searchResults &&
      state.searchResults.getFacetValues('food_type', {sortBy: ['count:desc', 'selected']}) ||
      []
  })
)(FoodTypes);

export default ConnectedFoodTypes;
