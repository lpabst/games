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

  clickToDropSand(e){
    let { scale } = this.data;
    let bounds = e.target.getBoundingClientRect();
    let x = e.clientX - bounds.left;
    let y = e.clientY - bounds.top;
    let i = Math.floor(x/scale);
    let j = Math.floor(y/scale);
    this.data.sandArray[i][j] += 1000000;
  }

  render() {
    return (
      <div className="Art">

        <div className="gameWrapper" >

          <div className='artWrapper'>
            <h1>Sandpiles</h1>
            <p>Visualization of looking at the top of a sand pile as sand is dropped onto the top of it. As too much sand accumulates in one area, it topples onto its neighbors. By default the sand is dropped in the middle of the black background, but you can also click anywhere on the canvas to drop some sand there as well. Click a bunch of places and see what happens! The world is your oyster</p>
            <div className='canvasWrapper'>
              <canvas width='600' height='600' id='sandpileCanvas' onMouseDown={(e) => this.clickToDropSand(e)} ></canvas>
            </div>
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