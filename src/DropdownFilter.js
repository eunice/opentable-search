import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

import FoodTypes from './FoodTypes.js'
import Ratings from './Ratings.js'
import PaymentOptions from './PaymentOptions.js'

// onClick={handleClick}
const DropdownFilter = connect()(
  ({helper}) =>
  <div className='DropdownFilter__container'>
   <div>
      Cuisine/Food Type
    </div>
    <div>
      Rating
    </div>
    <div>
      Payment Options
    </div>
  </div>
);

export default DropdownFilter;

 