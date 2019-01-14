import React, {Component} from 'react';

class Tile extends Component {

  render() {
    const {id, index, tilePosition, selectedTile} = this.props;
    return(
      <div 
        id={id}
        style={{gridArea: tilePosition.slot}}
        className="tile"
        onClick={(event) => selectedTile(event)}
      >
        {index}
      </div>
    );
  }
}

export default Tile;