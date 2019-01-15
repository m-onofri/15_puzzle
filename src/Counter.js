import React, {Component} from 'react';

class Counter extends Component {
  render() {
    const {counter} = this.props;

    return (
      <div id="counter" className="component">
        <h2>COUNTER</h2>
        <div className="value">
          <h3>{counter}</h3>
        </div>
      </div>
    );
  }
}

export default Counter;