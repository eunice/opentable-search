import React, { PropTypes, Component } from 'react';

import Stars from './Stars.js'

const getHighlighted = s => ({__html: s});

const starStyle = {
  width: '4%',
  height: '4%'
}

const Hit = ({ name, neighborhood, food_type, reviews_count, stars_count, price_range, image_url}) => {
      
      return (
        <div className='Hits__restaurant-container'>
          <div className='Hit__restaurant-image-container'>
            <img className='Hit__restaurant-image' src={image_url}/>
          </div>

          <div className="Hit__restaurant-info-container">
            <p className='Hit__restaurant-name'>{name}</p>
            <p className='Hit__restaurant-rating-container'>
              <span className='Hit__restaurant-star-count'>{stars_count}</span>
              <span className='Hit__restaurant-star-container'><Stars rating={stars_count}/></span>
              <span className='Hit__restaurant-review-count'>({reviews_count} reviews)</span>
            </p>
            <p className='Hit__restaurant-detail-container'>
              <span className='Hit__restaurant-food-type'>{food_type} | </span>
              <span className='Hit__restaurant-neighborhood'>{neighborhood} | </span>
              <span className='Hit__restaurant-price-range'>{price_range} </span>
            </p>
          </div>
        </div>)
};

export default Hit;
