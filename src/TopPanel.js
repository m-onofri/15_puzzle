import React, { Component } from 'react';
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
        />
        <Button
          resetGame={resetGame}
        />
      </div>
    );
  }
}

export default TopPanel;
