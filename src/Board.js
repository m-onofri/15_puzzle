import React, {Component} from 'react';
import Tile from './Tile.js';

class Board extends Component {


  render() {
    const{tiles, selectedTile} = this.props;
    const tilesID = Object.keys(tiles);
    return(
      <div id="board">
        {tilesID.map((tile, i) => <Tile 
                                    id={tile}
                                    index={i + 1}
                                    tilePosition={tiles[tile]}
                                    selectedTile={this.props.selectedTile}
                                  />)}

      </div>
    );
  }
}

export default Board;