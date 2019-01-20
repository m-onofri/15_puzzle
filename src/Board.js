import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile.js';

class Board extends Component {


  render() {
    const {tiles,
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
                                    key={i + 1}
                                    tilePosition={tiles[tile]}
                                    selectedTile={selectedTile}
                                    complete={complete}
                                  />)}
        {complete && <Tile
                       id="t16"
                       index={16}
                       tilePosition={{slot: 'sl16', x: 3, y: 3}}
                       complete={complete}
                      />}
      </div>
    );
  }
}

Board.propTypes = {
  tiles: PropTypes.object,
  selectedTile: PropTypes.func,
  alert: PropTypes.bool,
  complete: PropTypes.bool
}

export default Board;
