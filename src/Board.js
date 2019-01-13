import React, {Component} from 'react';
import Tile from './Tile.js';

class Board extends Component {

  generateTile = () => {
    const container = [];
    for (let i = 1; i < 16; i++) {
      container.push(<Tile 
                       index={i} 
                       selectedTile={this.props.selectedTile}
                     />);
    }
    return container;
  }

  render() {

    return(
      <div id="board">
        {this.generateTile()}
      </div>
    );
  }
}

export default Board;