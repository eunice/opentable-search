import React, { PropTypes, Component } from 'react';
import reactAlgoliaSearchHelper, { connect } from 'react-algoliasearch-helper';
import Rating from './Rating.js'

class Ratings extends Component {
  constructor(props){
    super(props);

    this.state = {
      isCollapsed: false,
      selected: false
    }

    this.handleClickListItem = this.handleClickListItem.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  handleCollapse() {
    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed
    }))
  }

  handleClickListItem(i) {
    const lowerRange = Math.floor(i);
    const upperRange = lowerRange + 1;
    this.props.helper.removeNumericRefinement('stars_count').addNumericRefinement('stars_count', '<', upperRange).addNumericRefinement('stars_count', '>=', lowerRange).search();
  }

  render() {
    let classMenu = this.props.parent == 'sidebar' ? 'FilterMenu' : 'DropdownMenu';
    
    let ratings = []
    for (let i = 0; i <= 5; i++) {
      ratings.push(
      <Rating rating={i} handleClick={e => this.handleClickListItem(i)}/>
      );
    };

    return (
      <div className={classMenu}>
        <div 
          className={classMenu + '__heading'}
          onClick={this.handleCollapse}
          >
          Rating
        </div>
        <ul className={classMenu + "__ratings-container" + (this.state.isCollapsed ? '--collapse' : '')} >
          {ratings}
        </ul>
      </div>
    );    
  }
}

Ratings.PropTypes = {
  helper: PropTypes.object.isRequired,
  parent: PropTypes.string.isRequired
}

const ConnectedRatings = connect()(Ratings);

export default ConnectedRatings;
