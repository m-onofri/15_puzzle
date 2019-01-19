import React, { Component } from 'react';
import Board from './Board.js';
import TopPanel from './TopPanel.js';



class App extends Component {
  state = {
    tiles: {},
    emptySlot: {slot: 'sl16', x: 3, y: 3},
    counter: 0,
    alert: false,
    isGameStarted: false
  }

  TILES = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8',
           't9', 't10', 't11', 't12', 't13', 't14', 't15'];

  SLOTS = [{slot: 'sl1', x: 0, y: 0},
           {slot: 'sl2', x: 0, y: 1},
           {slot: 'sl3', x: 0, y: 2},
           {slot: 'sl4', x: 0, y: 3},
           {slot: 'sl5', x: 1, y: 0},
           {slot: 'sl6', x: 1, y: 1},
           {slot: 'sl7', x: 1, y: 2},
           {slot: 'sl8', x: 1, y: 3},
           {slot: 'sl9', x: 2, y: 0},
           {slot: 'sl10', x: 2, y: 1},
           {slot: 'sl11', x: 2, y: 2},
           {slot: 'sl12', x: 2, y: 3},
           {slot: 'sl13', x: 3, y: 0},
           {slot: 'sl14', x: 3, y: 1},
           {slot: 'sl15', x: 3, y: 2}];

  shuffle = (array) => {
    let newArr = [...array];
    let currentIndex = newArr.length;
    let counter = 20;
    let temporaryValue = undefined;

    while (counter > 0) {
      let index1 = Math.floor(Math.random() * currentIndex);
      let index2 = Math.floor(Math.random() * currentIndex);

      while (index1 === index2) {
        index2 = Math.floor(Math.random() * currentIndex);
      }

      temporaryValue = newArr[index1];
      newArr[index1] = newArr[index2];
      newArr[index2] = temporaryValue;

      counter -= 1;
    }

    return newArr;
  }

  createObject = () => {
    let randomArray = this.shuffle(this.SLOTS);
    let newObj = this.TILES.reduce((obj, item, i) => {
      obj[item] = randomArray[i];
      return obj;
    }, {});
    return newObj;
  }

  isValidSelection = (start, end) => {
    if ((start.x === end.x || start.y === end.y) &&
       (Math.abs(start.x - end.x) === 1 || Math.abs(start.y - end.y) === 1)) return true;
     return false;
  }

  isGameComplete = () => {
    for (let i = 0; i < this.TILES.length; i++) {
      let tile = this.TILES[i];
      let slot = this.SLOTS[i].slot;
      if (this.state.tiles[tile].slot !== slot) {
        return false;
      }
    }
    return true;
  }

  selectedTile = (event) => {
    const tileID = event.target.id;
    const tilePosition = this.state.tiles[tileID];
    const emptySlot = this.state.emptySlot;
    if (this.isValidSelection(tilePosition, emptySlot)) {
      const newObj = {...this.state.tiles};
      newObj[tileID]= emptySlot;
      this.setState( prevState => ({
        tiles: newObj,
        emptySlot: tilePosition,
        counter: prevState.counter + 1,
        alert: false,
        isGameStarted: true
      }));
    } else {
      this.setState({alert: true});
    }
  }

  resetGame = () => {
    const newObj = this.createObject();
    this.setState(prevState => ({
      tiles: newObj,
      emptySlot: {slot: 'sl16', x: 3, y: 3},
      counter: 0,
      alert: false,
      isGameStarted:false
    }));
  }

  componentWillMount = () => {
    const newObj = this.createObject();
    this.setState({
      tiles: newObj
    });
  }


  render() {

    const completeGame = this.isGameComplete() ? true : false;
    return (
      <dev id="app">
        <h1>The Fifthteen Puzzle Challenge</h1>
        <TopPanel
          counter={this.state.counter}
          resetGame={this.resetGame}
          isGameStarted={this.state.isGameStarted}
          complete={completeGame}
        />
        <Board
          tiles= {this.state.tiles}
          selectedTile={this.selectedTile}
          alert={this.state.alert}
          complete={completeGame}
        />
      </dev>
    );
  }
}

export default App;
