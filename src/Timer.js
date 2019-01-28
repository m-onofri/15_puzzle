import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  state = {
    isTimeRunning: false,
    elapsedTime: 0,
    previousTime: 0
  }

  //Start the execution of tick method each 100 ms
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 100);
  }

  //End the execution of setInterval when the component will be unmount
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  //Control the regular functioning of timer
  timerControl = () => {
    const now = Date.now();
    this.setState(prevState => ({
      previousTime: now,
      elapsedTime: prevState.elapsedTime + (now - prevState.previousTime)
    }));
  }

  //Start the timer
  timerStart = () => {
    this.setState(prevState => ({
      isTimeRunning: true,
      previousTime: Date.now()
    }));
  }

  //Stop the timer
  timerStop = () => {
    this.setState(prevState => ({
      isTimeRunning: false
    }));
  }

  //Reset the timer to zero
  timerReset = () => {
    this.setState(prevState => ({
      isTimeRunning: false,
      elapsedTime: 0,
      previousTime: 0
    }));
  }

  tick = () => {
       //Reset the timer to zero whenever the game restart
    if ((!this.props.isGameStarted && !this.state.isTimeRunning && !this.props.complete) ||
      //Reset the timer to zero during the game after pressing the reset button
        (!this.props.isGameStarted && this.state.isTimeRunning && !this.props.complete)) {
      this.timerReset();
    }
    //It's executed when isGameStarted === true
    //timerStart set isTimeRunning = true so the next block (with timerControl) is executed
    if (this.props.isGameStarted && !this.state.isTimeRunning && !this.props.complete) {
      this.timerStart();
    }
    if (this.props.isGameStarted && this.state.isTimeRunning && !this.props.complete) {
      this.timerControl();
    }
    //It's executed when the game is over
    if (this.props.isGameStarted && this.state.isTimeRunning && this.props.complete) {
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

Timer.propTypes = {
  isGameStarted: PropTypes.bool,
  complete: PropTypes.bool
}

export default Timer;
