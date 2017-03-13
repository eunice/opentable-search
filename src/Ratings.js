import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

const starStyle = {
  width: '10%',
  height: '10%'
}

const StarFilled = () => <span><img style={starStyle} src="././images/stars-plain.png" /></span>;

const StarEmpty = () => <span><img style={starStyle} src="././images/star-empty.png" /></span>;

const Rating = ({rating, handleClick}) => {
  let stars = []
  for (let i = 0; i < rating; i++){
    stars.push(<StarFilled/>)
  }
  while (stars.length < 5) {
    stars.push(<StarEmpty />)
  }
  return (
    <li onClick={handleClick}>{stars}</li>
  );
}


const Ratings = connect(
  state => ({
  })
)(
  ({ratings, helper}) => {
    console.log('r',ratings) //clean this up
    var ratings = []
    for (let i = 0; i <= 5; i++) {
      ratings.push(
      <Rating rating={i} handleClick={e => {helper.removeNumericRefinement('stars_count').addNumericRefinement('stars_count', '<=', i+0.5).addNumericRefinement('stars_count', '>', i-0.5).search()}}/>
      );
    };
  return (
    <div className='FilterMenu'>
      <div className='FilterMenu__heading'>Rating</div>
      <ul className="FilterMenu__ratings-container" >
        {ratings}
      </ul>
    </div>
  )}
);


export default Ratings;
