import React, {Component} from 'react';

class Timer extends Component {
  state = {
    isTimeRunning: false,
    elapsedTime: 0,
    previousTime: 0
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick = () => {
    if (this.state.isTimeRunning) {
      const now = Date.now();
      this.setState(prevState => ({
        previousTime: now,
        elapsedTime: prevState.elapsedTime + (now - prevState.previousTime)
      }));
    }
    if (this.props.isGameStarted && !this.state.isTimeRunning && !this.props.complete) {
      this.setState(prevState => ({
        isTimeRunning: true,
        previousTime: Date.now()
      }));
    }
    if (this.props.complete && this.state.isTimeRunning) {
      this.setState(prevState => ({
        isTimeRunning: false
      }));
    }
    if (!this.props.isGameStarted && !this.state.isTimeRunning && !this.props.complete) {
      this.setState(prevState => ({
        isTimeRunning: false,
        elapsedTime: 0,
        previousTime: 0
      }));
    }
  }

  render() {

    const seconds = Math.floor(this.state.elapsedTime / 1000);

    return(
      <div id="timer" class="component">
        <h2>TIMER</h2>
        <div class="time"><h3>{seconds} sec</h3></div>
      </div>
    );
  }
}

export default Timer;
