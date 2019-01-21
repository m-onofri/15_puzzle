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

  timerControl = () => {
    const now = Date.now();
    this.setState(prevState => ({
      previousTime: now,
      elapsedTime: prevState.elapsedTime + (now - prevState.previousTime)
    }));
  }

  timerStart = () => {
    this.setState(prevState => ({
      isTimeRunning: true,
      previousTime: Date.now()
    }));
  }

  timerStop = () => {
    this.setState(prevState => ({
      isTimeRunning: false
    }));
  }

  timerReset = () => {
    this.setState(prevState => ({
      isTimeRunning: false,
      elapsedTime: 0,
      previousTime: 0
    }));
  }

  tick = () => {
    if ((!this.props.isGameStarted && !this.state.isTimeRunning && !this.props.complete) ||
        (!this.props.isGameStarted && this.state.isTimeRunning && !this.props.complete)) {
      //Reset the timer to zero
      this.timerReset();
      // FARE: deve essere possibile fare reset anche durante il gioco
    }
    if (this.props.isGameStarted && !this.state.isTimeRunning && !this.props.complete) {
      //Start the timer
      this.timerStart();
    }
    if (this.props.isGameStarted && this.state.isTimeRunning && !this.props.complete) {
      //Control the timer when the game starts
      this.timerControl();
    }
    if (this.props.isGameStarted && this.state.isTimeRunning && this.props.complete) {
      //When the game is over, stop the timer
      this.timerStop();
    }
  }

  render() {

    const seconds = Math.floor(this.state.elapsedTime / 1000);
    const {complete} = this.props;

    return(
      <div
        id="timer"
        className={`${'component'} ${complete ? 'complete' : undefined}`}>
        <h2>TIMER</h2>
        <div className="time"><h3>{seconds} sec</h3></div>
      </div>
    );
  }
}

export default Timer;
