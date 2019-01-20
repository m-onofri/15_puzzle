import React, { Component } from 'react';
import Board from './Board.js';
import TopPanel from './TopPanel.js';

//Tiles' IDs
const TILES = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8',
               't9', 't10', 't11', 't12', 't13', 't14', 't15'];

//Slots' IDs and position in the grid
const SLOTS = [{slot: 'sl1', x: 0, y: 0},
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

class App extends Component {
  state = {
    tiles: {},
    emptySlot: {slot: 'sl16', x: 3, y: 3},
    counter: 0,
    alert: false,
    isGameStarted: false
  }

  //Mix an array making an even number of items swap
  //It takes an array as a single argument and return a new shuffled array
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

  //Return an object taking keys from an array and taking values from another array
  createObject = () => {
    let randomArray = this.shuffle(SLOTS);
    let newObj = TILES.reduce((obj, item, i) => {
      obj[item] = randomArray[i];
      return obj;
    }, {});
    return newObj;
  }

  //Check if the tile selected from the user can be moved on the empty spot
  isValidSelection = (start, end) => {
    if (start.x === end.x || start.y === end.y) return true;
     return false;
  }

  //Check if all the tiles are positioned in the correct order
  isGameComplete = () => {
    for (let i = 0; i < TILES.length; i++) {
      let tile = TILES[i];
      let slot = SLOTS[i].slot;
      if (this.state.tiles[tile].slot !== slot) {
        return false;
      }
    }
    return true;
  }

  //Update the state based on the tike selected by the user
  selectedTile = (event) => {
    const tiles = this.state.tiles;
    const tileID = event.target.id;
    const tilePosition = this.state.tiles[tileID];
    const emptySlot = this.state.emptySlot;
    let newEmptySlot, mediumTile;

    if (this.isValidSelection(tilePosition, emptySlot)) {
      const newObj = {...this.state.tiles};

      if ((Math.abs(tilePosition.x - emptySlot.x) === 1 ||
           Math.abs(tilePosition.y - emptySlot.y) === 1)) {
        newObj[tileID]= emptySlot;
        newEmptySlot = [tilePosition];
      }

      if ((Math.abs(tilePosition.x - emptySlot.x) === 0 && Math.abs(tilePosition.y - emptySlot.y) === 2)) {
        if (tilePosition.y < emptySlot.y) {
          mediumTile = Object.keys(tiles).filter(tile => {
            return tiles[tile].y === (tilePosition.y + 1) && tiles[tile].x === tilePosition.x;
          });
        } else {
          mediumTile = Object.keys(tiles).filter(tile => {
            return tiles[tile].y === (tilePosition.y - 1) && tiles[tile].x === tilePosition.x;
          });
        }
        newObj[tileID] = newObj[mediumTile];
        newObj[mediumTile]= emptySlot;
        newEmptySlot = [tilePosition];
      }

      if ((Math.abs(tilePosition.y - emptySlot.y) === 0 && Math.abs(tilePosition.x - emptySlot.x) === 2)) {
        if (tilePosition.x < emptySlot.x) {
          mediumTile = Object.keys(tiles).filter(tile => {
            return tiles[tile].x === (tilePosition.x + 1) && tiles[tile].y === tilePosition.y;
          });
        } else {
          mediumTile = Object.keys(tiles).filter(tile => {
            return tiles[tile].x === (tilePosition.x - 1) && tiles[tile].y === tilePosition.y;
          });
        }
        newObj[tileID] = newObj[mediumTile];
        newObj[mediumTile]= emptySlot;
        newEmptySlot = [tilePosition];
      }

      this.setState( prevState => ({
        tiles: newObj,
        emptySlot: newEmptySlot[0],
        counter: prevState.counter + 1,
        alert: false,
        isGameStarted: true
      }));
    } else {
      this.setState({alert: true});
    }
  }

  //Reset the state
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

  //Create the "tiles" object in the state before mounting the component
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
        <h1>The 15 Puzzle Challenge</h1>
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
