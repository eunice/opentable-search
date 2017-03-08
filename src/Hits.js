import React, { Component } from 'react';
import reactAlgoliaSearchHelper, { Provider, connect } from 'react-algoliasearch-helper';

const getHighlighted = s => ({__html: s});

const Hit = ({
  _highlightResult: {
    name: {
      value: name
    }
  }
}) => <div dangerouslySetInnerHTML={getHighlighted(name)}/>;

// const Hit = () <div></div>

const Results = ({results}) => results &&
<div className="results">
  {results.hits.map(hit => <Hit key={hit.objectID} {...hit} />)}
</div>;

const Hits = connect(
  state => ({results: state.searchResults})
)(Results);

export default Hits;
