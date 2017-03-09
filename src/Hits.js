import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

import { Col, Grid, Row, Image } from 'react-bootstrap';

const hitStyle = {
  
}

const getHighlighted = s => ({__html: s});

// const Hit = ({
//   _highlightResult: {
//     name: {
//       value: name
//     }
//   }
// }) => <div dangerouslySetInnerHTML={getHighlighted(name)}/>;

const Hit = ({
  name: name,
  neighborhood: neighborhood,
  food_type: food_type,
  reviews_count: reviews_count,
  stars_count: stars_count,
  price_range: price_range,
  image_url: image_url
}) => <Grid>
        <Row>
          <Col xs={3} md={3}>
            <Image src={image_url} rounded/>
          </Col>
          <Col xs={9} md={9}>
            <div className='restaurantName'>{name}</div>
            <div className='restaurantRating'>
              <span>{stars_count}</span>
              <span>({reviews_count} reviews)</span>
            </div>
            <div className='restaurantDetail'>
              <span>{food_type} | </span>
              <span>{neighborhood} | </span>
              <span className='restaurantPriceRange'>{price_range} </span>
            </div>
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
      {/*console.log('hit',hit)*/}
        return <Hit key={hit.objectID} {...hit} />
    })
  }
</div>;

const Hits = connect(
  state => ({results: state.searchResults})
)(Results);

export default Hits;
