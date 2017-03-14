import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

import StarEmpty from './StarEmpty.js'
import StarFilled from './Starfilled.js'

const starStyle = {
  width: '25px', 
  height: '25px'
}

const Rating = ({rating, handleClick}) => {
  let stars = []
  for (let i = 0; i < rating; i++){
    stars.push(<StarFilled style={starStyle} />)
  }
  while (stars.length < 5) {
    stars.push(<StarEmpty style={starStyle} />)
  }
  return (
    <li onClick={handleClick}>{stars}</li>
  );
}

class Ratings extends Component {
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

  handleClickListItem(i) {
    this.props.helper.removeNumericRefinement('stars_count').addNumericRefinement('stars_count', '<=', i+0.5).addNumericRefinement('stars_count', '>', i-0.5).search();
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

const ConnectedRatings = connect(
  state => ({
  })
)(Ratings);


export default ConnectedRatings;
