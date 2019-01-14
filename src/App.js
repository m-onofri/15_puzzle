import React, { Component } from 'react';
import Board from './Board.js';


class App extends Component {
  state = {
    tiles: {
      t1: {slot: 'sl1', x: 0, y: 0},
      t2: {slot: 'sl2', x: 0, y: 1},
      t3: {slot: 'sl3', x: 0, y: 2},
      t4: {slot: 'sl4', x: 0, y: 3},
      t5: {slot: 'sl5', x: 1, y: 0},
      t6: {slot: 'sl6', x: 1, y: 1},
      t7: {slot: 'sl7', x: 1, y: 2},
      t8: {slot: 'sl8', x: 1, y: 3},
      t9: {slot: 'sl9', x: 2, y: 0},
      t10: {slot: 'sl10', x: 2, y: 1},
      t11: {slot: 'sl11', x: 2, y: 2},
      t12: {slot: 'sl12', x: 2, y: 3},
      t13: {slot: 'sl13', x: 3, y: 0},
      t14: {slot: 'sl14', x: 3, y: 1},
      t15: {slot: 'sl15', x: 3, y: 2}
    },
    emptySlot: {slot: 'sl16', x: 3, y: 3}
  }

  isValidSelection = (start, end) => {
    if ((start.x === end.x || start.y === end.y) && 
       (Math.abs(start.x - end.x) === 1 || Math.abs(start.y - end.y) === 1)) return true;
     return false;
  }

  selectedTile = (event) => {
    const tileID = event.target.id;
    const tilePosition = this.state.tiles[tileID];
    const emptySlot = this.state.emptySlot;
    if (this.isValidSelection(tilePosition, emptySlot)) {
      const newObj = {...this.state.tiles};
      newObj[tileID]= emptySlot;
      this.setState({
        tiles: newObj,
        emptySlot: tilePosition
      });
    } else {
      console.log('WTF!!!');
    }
  }

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
        <Board
          tiles= {this.state.tiles}
          selectedTile={this.selectedTile}
        />
      </dev>
    );
  }
}

export default App;
