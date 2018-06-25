import React, { Component } from 'react';
import './Art.css';

import sandPile from './canvasJS/sandPile.js';
import gameOfLife from './canvasJS/gameOfLife.js';
import barnsleyFern from './canvasJS/barnsleyFern.js';

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
    gameOfLife.init(this);
    barnsleyFern.init(this);
  }

  clickToDropSand(e){
    let { scale } = this.sandPile.data;
    let bounds = e.target.getBoundingClientRect();
    let x = e.clientX - bounds.left;
    let y = e.clientY - bounds.top;
    let i = Math.floor(x/scale);
    let j = Math.floor(y/scale);
    this.sandPile.data.sandArray[i][j] += 1000000;
  }

  toggleGameOfLifeFadingEffect(){
    this.gameOfLife.data.fadingEffect = !this.gameOfLife.data.fadingEffect;
  }

  render() {
    return (
      <div className="Art">

        <div className="gameWrapper" >

          <div className='artWrapper'>
            <h1>Sand Piles</h1>
            <p>Visualization of looking at the top of a sand pile as sand is dropped onto the top of it. As too much sand accumulates in one area, it topples onto its neighbors. By default the sand is dropped in the middle of the black background, but you can also click anywhere on the canvas to drop some sand there as well. Click a bunch of places and see what happens! The world is your oyster. Learn more <span><a target='_blank' href='https://en.wikipedia.org/wiki/Abelian_sandpile_model' rel="noopener noreferrer">here</a></span>.</p>
            <div className='canvasWrapper'>
              <canvas width='600' height='600' id='sandpileCanvas' onMouseDown={(e) => this.clickToDropSand(e)} ></canvas>
            </div>
          </div>

          <div className='artWrapper'>
            <h1>Game of Life</h1>
            <p>Visualization of the game of life, a cellular automaton devised by the British mathematician John Horton Conway in 1970. Each cell is either alive or dead, and is updated each frame depending on how many alive neighbors it has. I've also added a button so you can toggle a 'fading' effect so you can watch the cell slowly fade as it "dies". Learn more <span><a target='_blank' href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' rel="noopener noreferrer">here</a></span>.</p>
            
            <center>
              <button onClick={() => this.toggleGameOfLifeFadingEffect()} >Toggle Fading Effect</button>
              <button onClick={() => gameOfLife.init(this)} >Reset Board</button>
            </center>
            
            <div className='canvasWrapper'>
              <canvas width='600' height='600' id='gameOfLifeCanvas'></canvas>
            </div>
          </div>

          <div className='artWrapper'>
            <h1>Barnsley Fern</h1>
            <p>A whole bunch of random points are plotted based on a mathematical formula, and the end result resembles a fern. Learn more <span><a target='_blank' href='https://en.wikipedia.org/wiki/Barnsley_fern' rel="noopener noreferrer">here</a></span>.</p>
            <div className='canvasWrapper'>
              <canvas width='600' height='600' id='fernCanvas'></canvas>
            </div>
          </div>

        </div>

      </div>
    );
  }
}


export default Art;