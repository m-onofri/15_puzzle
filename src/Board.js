import React, {Component} from 'react';
import Tile from './Tile.js';

class Board extends Component {


  render() {
    const{tiles,
          selectedTile,
          alert,
          complete} = this.props;
    const tilesID = Object.keys(tiles);

    return(
      <div 
        id="board"
        className={`${alert ? "alert" : undefined} ${complete ? 'complete' : undefined}`}
      >
        {tilesID.map((tile, i) => <Tile 
                                    id={tile}
                                    index={i + 1}
                                    tilePosition={tiles[tile]}
                                    selectedTile={selectedTile}
                                    complete={complete}
                                  />)}

      </div>
    );
  }
}

export default Board;