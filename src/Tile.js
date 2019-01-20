import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Tile extends Component {

  isGameActive = (event) => {
    if (!this.props.complete) {
      this.props.selectedTile(event);
    }
  }

  render() {
    const {id, index, tilePosition} = this.props;
    return(
      <div
        id={id}
        style={{gridArea: tilePosition.slot}}
        className="tile"
        onClick={(event) =>this.isGameActive(event)}
      >
        {index}
      </div>
    );
  }
}

Tile.PropTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  tilePosition: PropTypes.object
}

export default Tile;
