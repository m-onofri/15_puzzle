import React, { Component } from 'react';


class App extends Component {
  render() {
    return (
      <dev id="app">
        <h1>The Fifthteen Puzzle Challenge</h1>
        <div id="components">
          <div id="timer" class="component">
            <h2>TIMER</h2>
            <div class="controller">play</div>
            <div class="time"><h3>0 sec</h3></div>
          </div>
          <div id="counter" class="component">
            <h2>COUNTER</h2>
            <div class="value"><h3>0</h3></div>
          </div>
        </div>
        <div id="board">
          <div id='t1' class="tile">1</div>
          <div id='t2' class="tile">2</div>
          <div id='t3' class="tile">3</div>
          <div id='t4' class="tile">4</div>
          <div id='t5' class="tile">5</div>
          <div id='t6' class="tile">6</div>
          <div id='t7' class="tile">7</div>
          <div id='t8' class="tile">8</div>
          <div id='t9' class="tile">9</div>
          <div id='t10' class="tile">10</div>
          <div id='t11' class="tile">11</div>
          <div id='t12' class="tile">12</div>
          <div id='t13' class="tile">13</div>
          <div id='t14' class="tile">14</div>
          <div id='t15' class="tile">15</div> 
        </div>
      </dev>
    );
  }
}

export default App;
