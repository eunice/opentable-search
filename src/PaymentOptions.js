import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

const PaymentOption = ({name, count, isRefined, handleClick}) =>
<li className={"FilterMenu__list-item" + (isRefined ? '--selected' : '')}
  onClick={handleClick}>
    <span className={"FilterMenu__list-name" + (isRefined ? '--selected' : '')}>
      {name}{' '}
    </span>
    <span className={"FilterMenu__list-result-count" + (isRefined ? '--selected' : '')}>
      {count}
    </span>
</li>

// connect(state: {}))
const PaymentOptions = connect(
  state => ({
    paymentOptions: state.searchResults &&
      state.searchResults.getFacetValues('payment_options', {sortBy: ['count:desc', 'selected']}) ||
      []
  })
)(
  ({paymentOptions, helper}) => {
    console.log('p',paymentOptions)
return (<div className='FilterMenu'>
  <div className='FilterMenu__heading'>Payment Options</div>
  <ul className="FilterMenu__payment-options-container ">
  {paymentOptions.map(
    paymentOption =>
      <PaymentOption
        key={paymentOption.name}
        {...paymentOption}
        handleClick={e => helper.toggleRefine('payment_options', paymentOption.name).search()}
      />
  )}
</ul></div>)
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
