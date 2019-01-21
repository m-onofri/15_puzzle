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

  //Find tile next to the one selected by the user
  //It takes 3 arguments: tile position (object), step (num) and coordinate1 (string)
  intermediateTile = (tilePosition, step, coordinate1) => {
    const tiles = this.state.tiles;
    const coordinate2 = coordinate1 === "x" ? "y" : "x";
    return Object.keys(tiles).filter(tile => {
      return tiles[tile][coordinate1] === (tilePosition[coordinate1] + step) &&
             tiles[tile][coordinate2] === tilePosition[coordinate2];
    });
  }

  //Update the state based on the tile selected by the user
  selectedTile = (event) => {
    const tileID = event.target.id;
    const tilePosition = this.state.tiles[tileID];
    const emptySlot = this.state.emptySlot;
    const newObj = {...this.state.tiles};
    let mediumTile, mediumTile1;

    if (tilePosition.x === emptySlot.x || tilePosition.y === emptySlot.y) {
      //1-tile move
      if ((Math.abs(tilePosition.x - emptySlot.x) === 1 || Math.abs(tilePosition.y - emptySlot.y) === 1)) {
        newObj[tileID]= emptySlot;
      }
      //2-tiles move
      if ((Math.abs(tilePosition.x - emptySlot.x) === 2 || Math.abs(tilePosition.y - emptySlot.y) === 2)) {

        if ((Math.abs(tilePosition.x - emptySlot.x) === 0 && Math.abs(tilePosition.y - emptySlot.y) === 2)) {
          mediumTile = (tilePosition.y < emptySlot.y) ? this.intermediateTile(tilePosition, 1, 'y') : this.intermediateTile(tilePosition, -1, 'y');
        } else if ((Math.abs(tilePosition.y - emptySlot.y) === 0 && Math.abs(tilePosition.x - emptySlot.x) === 2)) {
          mediumTile = (tilePosition.x < emptySlot.x) ? this.intermediateTile(tilePosition, 1, 'x') : this.intermediateTile(tilePosition, -1, 'x');
        }

        newObj[tileID] = newObj[mediumTile];
        newObj[mediumTile]= emptySlot;
      }
      //3-tiles move
      if ((Math.abs(tilePosition.x - emptySlot.x) === 3 || Math.abs(tilePosition.y - emptySlot.y) === 3)) {

        if ((Math.abs(tilePosition.x - emptySlot.x) === 0 && Math.abs(tilePosition.y - emptySlot.y) === 3)) {
          mediumTile = (tilePosition.y < emptySlot.y) ? this.intermediateTile(tilePosition, 1, 'y') : this.intermediateTile(tilePosition, -1, 'y');
          mediumTile1 = (tilePosition.y < emptySlot.y) ? this.intermediateTile(tilePosition, 2, 'y') : this.intermediateTile(tilePosition, -2, 'y');
        } else if ((Math.abs(tilePosition.y - emptySlot.y) === 0 && Math.abs(tilePosition.x - emptySlot.x) === 3)) {
          mediumTile = (tilePosition.x < emptySlot.x) ? this.intermediateTile(tilePosition, 1, 'x') : this.intermediateTile(tilePosition, -1, 'x');
          mediumTile1 = (tilePosition.x < emptySlot.x) ? this.intermediateTile(tilePosition, 2, 'x') : this.intermediateTile(tilePosition, -2, 'x');
        }

        newObj[tileID] = newObj[mediumTile];
        newObj[mediumTile]= newObj[mediumTile1];
        newObj[mediumTile1]= emptySlot;
      }

      this.setState( prevState => ({
        tiles: newObj,
        emptySlot: tilePosition,
        counter: prevState.counter + 1,
        alert: false,
        isGameStarted: true
      }));
    } else {
      this.setState(prevState => ({alert: true}));
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
    this.setState({tiles: this.createObject()});
  }

  render() {
    const completeGame = this.isGameComplete() ? true : false;
    return (
      <div id="app">
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
      </div>
    );
  }
}

export default App;
