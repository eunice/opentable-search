import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';
import Price from './Price.js'

class PriceRange extends Component {
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

  handleClickListItem(priceRange) {
    this.props.helper.toggleRefine('price_range', priceRange.name).search()
  }  

  render() {
    let classMenu = this.props.parent == 'sidebar' ? 'FilterMenu' : 'DropdownMenu';

    return (
      <div className={classMenu}>
          <div 
            className={classMenu + '__heading'}
            onClick={this.handleCollapse}
            >
            Price Range
          </div>
          <ul className={classMenu + "__price-range-container" + (this.state.isCollapsed ? '--collapse' : '')}>
            {this.props.priceRange.map(
              priceRange =>
                <Price
                  key={priceRange.name}
                  classMenu={classMenu}
                  {...priceRange}
                  handleClick={e => this.handleClickListItem(priceRange)}
                />
            )}
          </ul>
      </div>
    );
  }
}

const ConnectedPriceRange = connect(
  state => ({
    priceRange: state.searchResults &&
      state.searchResults.getFacetValues('price_range', {sortBy: ['count:desc', 'selected']}) ||
      []
  })
)(PriceRange);

export default ConnectedPriceRange;
