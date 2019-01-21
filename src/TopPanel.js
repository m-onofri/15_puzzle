import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer.js';
import Counter from './Counter.js';
import Button from './Button.js';


class TopPanel extends Component {
  render() {
    const {counter,
           resetGame,
           isGameStarted,
           complete} = this.props;
    return(
      <div id="top-panel">
        <Timer
          isGameStarted={isGameStarted}
          complete={complete}
        />
        <Counter
          counter={counter}
          complete={complete}
        />
        <Button
          resetGame={resetGame}
        />
      </div>
    );
  }
}

TopPanel.propTypes = {
  counter: PropTypes.number,
  resetGame: PropTypes.func,
  isGameStarted: PropTypes.bool,
  complete: PropTypes.bool
}

export default TopPanel;
