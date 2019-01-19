import React, {Component} from 'react';

class Button extends Component {
  render() {
    return(
      <button
        onClick={() => this.props.resetGame()}
      >Reset</button>
    );
  }
}

export default Button;
