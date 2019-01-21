import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    return(
      <button
        onClick={() => this.props.resetGame()}
      >Reset</button>
    );
  }
}

Button.propTypes = {
  resetGame: PropTypes.func
}

export default Button;
