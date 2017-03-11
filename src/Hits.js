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

const nameStyle = {
  fontSize: '110%',
  color: 'black'
}

const imageStyle = {
  width: '100%'
}

const ratingStyle = {
  color: '#FFC08C'
}

const starStyle = {
  width: '3%',
  height: '3%'
}

const performanceContainerStyle = {
  margin: '15px'
}

const resultStyle = {
  fontSize: '120%',
  color: 'black'
}

const processTimeStyle = {
  fontSize: '100%',
  color: '#AAAAAA'
}

const restaurantContainerStyle = {
  margin: '5px'
}

const StarFilled = () => <span><img style={starStyle} src="././images/stars-plain.png" /></span>;

const StarEmpty = () => <span><img style={starStyle} src="././images/star-empty.png" /></span>;

const Hit = ({ name, neighborhood, food_type, reviews_count, stars_count, price_range, image_url}) => {
      let stars = [];
      for (let i = 0; i < stars_count; ++i){
        stars.push(<StarFilled/>)
      }
      while (stars.length < 5) {
        stars.push(<StarEmpty />)
      }
      return (<Grid>
        <Row className='restaurantContainer' style={restaurantContainerStyle}>
          <Col xs={3} md={2}>
            <Image style={imageStyle} className='restaurantImage' src={image_url} rounded/>
          </Col>
          <Col xs={9} md={10}>
            <p className='restaurantName' style={nameStyle}>{name}</p>
            <p className='restaurantRating'>
              <span style={ratingStyle}>{stars_count}</span>
              <span>{stars}</span>
              <span>({reviews_count} reviews)</span>
            </p>
            <p className='restaurantDetail'>
              <span>{food_type} | </span>
              <span>{neighborhood} | </span>
              <span className='restaurantPriceRange'>{price_range} </span>
            </p>
          </Col>
        </Row>
      </Grid>)
};


/*const Results = ({results}) => results &&
<div className="results">
  {results.hits.map(
    hit => <Hit key={hit.objectID} {...hit} />)
  }
</div>;*/

const Results = ({results}) => {
  console.log('hhhh', results)
  return results &&
  <div className="results">
    <Row style={performanceContainerStyle}>
      <span style={resultStyle}>{results.nbHits} results found </span>
      <span style={processTimeStyle}>in {results.processingTimeMS /1000 } seconds</span>
    </Row>
    {results.hits.map((hit) => {
          console.log(results)
          return <Hit key={hit.objectID} {...hit} />
      })
    }
  </div>
};

const Hits = connect(
  state => ({results: state.searchResults})
)(Results);

export default Hits;
