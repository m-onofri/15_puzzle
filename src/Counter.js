import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Counter extends Component {
  render() {
    const {counter, complete} = this.props;

    return (
      <div
        id="counter"
        className={`${'component'} ${complete ? 'complete' : undefined}`}>
        <h2>COUNTER</h2>
        <div className="value">
          <h3>{counter}</h3>
        </div>
      </div>
    );
  }
}

Counter.propTypes = {
  counter: PropTypes.number,
  complete: PropTypes.bool
}

export default Counter;
