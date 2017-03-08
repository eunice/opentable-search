import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

const PaymentOption = ({
  name,
  count,
  isRefined,
  handleClick
}) =>
<li>
  <label>
    <input
      type="checkbox"
      checked={isRefined}
      value={name}
      onChange={handleClick}
    />
    {name}{' '}
    <span className="badge">{count}</span>
  </label>
</li>;


// connect(state: {}))
const PaymentOptions = connect(
  state => ({
    paymentOptions: state.searchResults &&
      state.searchResults.getFacetValues('payment_options', {sortBy: ['count:desc', 'selected']}) ||
      []
  })
)(
  ({paymentOptions, helper}) => {
    console.log(paymentOptions)
return (<ul className="categories">
  {paymentOptions.map(
    paymentOption =>
      <PaymentOption
        key={paymentOption.name}
        {...paymentOption}
        handleClick={e => helper.toggleRefine('payment_options', paymentOption.name).search()}
      />
  )}
</ul>)
  }
);

/*class SearchBar extends Component {
  render() {
    return (
      <div className="SearchBar">
         <input type="text" autocomplete="off" id="search-box"/>
      </div>
    );
  }
}*/

export default PaymentOptions;
