import React, { Component } from 'react';
import './Art.css';

import sandPile from './canvasJS/sandPile.js';

class Art extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      showHighScores: false,
    }
  }

  componentDidMount(){
    sandPile.init(this);
  }

  render() {
    return (
      <div className="Art">

        <div className="gameWrapper" >

          <div className='canvasWrapper'>
            <canvas width='600' height='600' id='sandpileCanvas'></canvas>
          </div>

          <div className='canvasWrapper'>
            <canvas width='600' height='600' id='canvas2'></canvas>
          </div>

          <div className='canvasWrapper'>
            <canvas width='600' height='600' id='canvas3'></canvas>
          </div>

        </div>

      </div>
    );
  }
}


export default Art;