import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

import { Col, Grid, Row, Image } from 'react-bootstrap';

const getHighlighted = s => ({__html: s});

// const Hit = ({
//   _highlightResult: {
//     name: {
//       value: name
//     }
//   }
// }) => <div dangerouslySetInnerHTML={getHighlighted(name)}/>;


const imageStyle = {
  width: '100%',
  height: '90%'
}

const ratingStyle = {
  color: '#FFC08C'
}

const restaurantContainerStyle = {
  margin: '5px'
}

const Hit = ({
  name: name,
  neighborhood: neighborhood,
  food_type: food_type,
  reviews_count: reviews_count,
  stars_count: stars_count,
  price_range: price_range,
  image_url: image_url
}) => <Grid>
        <Row className='restaurantContainer' style={restaurantContainerStyle}>
          <Col xs={3} md={2}>
            <Image style={imageStyle} className='restaurantImage' src={image_url} rounded/>
          </Col>
          <Col xs={9} md={10}>
            <p className='restaurantName'>{name}</p>
            <p className='restaurantRating'>
              <span style={ratingStyle}>{stars_count}</span>
              <span>({reviews_count} reviews)</span>
            </p>
            <p className='restaurantDetail'>
              <span>{food_type} | </span>
              <span>{neighborhood} | </span>
              <span className='restaurantPriceRange'>{price_range} </span>
            </p>
          </Col>
        </Row>
      </Grid>;


/*const Results = ({results}) => results &&
<div className="results">
  {results.hits.map(
    hit => <Hit key={hit.objectID} {...hit} />)
  }
</div>;*/

const Results = ({results}) => results &&
<div className="results">
  {results.hits.map(
    function(hit) {
      console.log(results)
        return <Hit key={hit.objectID} {...hit} />
    })
  }
</div>;

const Hits = connect(
  state => ({results: state.searchResults})
)(Results);

export default Hits;
