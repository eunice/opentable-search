import React, { PropTypes, Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

import Hit from './Hit.js'
import ShowMore from './ShowMore.js'

class Results extends Component {
  constructor() {
    super();

    this.state = {
      previousHits: []
    }

    this.onLoadMoreClick = this.onLoadMoreClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage === 0) {
      // The search query was modified and the helper reset the page to 0.
      this.setState({
        previousHits: []
      });
    } else if (nextProps.currentPage !== this.props.currentPage) {
      // We've received a new page of hits.
      this.setState({
        previousHits: this.state.previousHits.concat(this.props.currentHits)
      });
    }
  }

  onLoadMoreClick() {
    this.props.helper.setQueryParameter('hitsPerPage', 20).setPage(this.props.currentPage + 1).search();
  }

  render() {
    // If a search is occuring, it means that the `currentHits` prop is not up to date and has already been persisted in state.
    const currentHits = this.props.searching ? [] : this.props.currentHits;
    const hits = this.state.previousHits.concat(currentHits);
    console.log('cccc',this.props.currentHits)
    const hitList = [];
    if (this.props.currentHits && this.props.currentHits.length > 0 ) {
      const hit = hits.map((hit) => {
              return <Hit key={hit.objectID} {...hit} />
          });
      const page = <ShowMore handleClick={this.onLoadMoreClick} />;
      hitList.push(hit,page);
    }

    return this.props.currentHits && (
      <div className="Hits">
        <div className="Hits__performance-container">
          <span className="Hits__results-number">{this.props.result.nbHits} results found </span>
          <span className="Hits__processing-time">in {this.props.result.processingTimeMS /1000 } seconds</span>
          <hr className="Hits__divider"/>
        </div>
        {hitList}
      </div>
    );
  }
}

Results.PropTypes = {
  helper: PropTypes.object.isRequired,
  searching: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  currentHits: PropTypes.array
}

const Hits = connect(state => ({
  searching: state.searching,
  currentPage: state.searchParameters.page,
  result: state.searchResults,
  currentHits: state.searchResults && state.searchResults.hits
}))(Results);

export default Hits;