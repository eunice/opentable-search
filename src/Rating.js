import React, { Component } from 'react';
import Stars from './Stars.js'

class Rating extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected: false
    }

    this.click = this.click.bind(this);
  }

  click() {
    this.setState(prevState => ({
      selected: !prevState.selected
    }));
    this.props.handleClick();
  }

  render() {
    return (
      <li className={'Rating__star-container' + (this.state.selected ? '--selected' : '')} onClick={this.click}>
        <Stars rating={this.props.rating} />
      </li>
    );
  }
}

export default Rating;
