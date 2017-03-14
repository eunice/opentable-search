import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

const PaymentOption = ({name, count, isRefined, classMenu, handleClick}) =>
<li className={classMenu + "__list-item" + (isRefined ? '--selected' : '')}
  onClick={handleClick}>
    <span className={classMenu + "__list-name" + (isRefined ? '--selected' : '')}>
      {name}{' '}
    </span>
    <span className={classMenu + "__list-result-count" + (isRefined ? '--selected' : '')}>
      {count}
    </span>
</li>

class PaymentOptions extends Component {
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

  handleClickListItem(paymentOption) {
    this.props.helper.toggleRefine('payment_options', paymentOption.name).search();
  }

  render() {
    let classMenu = this.props.parent == 'sidebar' ? 'FilterMenu' : 'DropdownMenu';

    return (
      <div className={classMenu}>
        <div 
          className={classMenu + '__heading'}
          onClick={this.handleCollapse}
          >
          Payment Options
        </div>
        <ul className={classMenu + "__payment-options-container" + (this.state.isCollapsed ? '--collapse' : '')}>
        {this.props.paymentOptions.map(
          paymentOption =>
            <PaymentOption
              key={paymentOption.name}
              classMenu={classMenu}
              {...paymentOption}
              handleClick={e => this.handleClickListItem(paymentOption)}
            />
        )}
        </ul>
      </div>
    );
  }
}

// connect(state: {}))
const ConnectedPaymentOptions = connect(
  state => ({
    paymentOptions: state.searchResults &&
      state.searchResults.getFacetValues('payment_options', {sortBy: ['count:desc', 'selected']}) ||
      []
  })
)(PaymentOptions);

export default ConnectedPaymentOptions;
