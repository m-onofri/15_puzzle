import React, {Component} from 'react';

class Tile extends Component {

  render() {
    return(
      <div 
        id={'t' + this.props.index.toString()}
        className="tile"
        onClick={(event) => this.props.selectedTile(event)}
      >
        {this.props.index}
      </div>
    );
  }
}

export default Tile;