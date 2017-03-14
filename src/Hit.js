import React, { PropTypes, Component } from 'react';
import Stars from './Stars.js'

const Hit = ({ name, neighborhood, food_type, reviews_count, stars_count, price_range, image_url, reserve_url}) => {
      
      return (
        <div className='Hits__restaurant-container' >
          
          <div className='Hit__restaurant-image-container'>
            <a href={reserve_url}>
            <img className='Hit__restaurant-image' src={image_url}/>
            </a>
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
