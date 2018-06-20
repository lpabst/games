import React, { Component } from 'react';
import './Minesweeper.css';

import minesweeper from './canvasJS/game.js';

class Minesweeper extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      showHighScores: false,
    }
  }

  componentDidMount(){
    document.oncontextmenu = function() {
      return false;
    }
  }

  startNewGame(){
    minesweeper.init(this);
  }

  toggleShowHighScores(){
    let showHighScores = !this.state.showHighScores;
    this.setState({showHighScores});
  }

  handleClick(e){
    var isRightMB;
    e = e || window.event;

    if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = e.which === 3; 
    else if ("button" in e)  // IE, Opera 
        isRightMB = e.button === 2; 

    if (isRightMB){
      minesweeper.handleClick(this, e, true);
    }else{
      minesweeper.handleClick(this, e, false);
    }
  }

  render() {
    return (
      <div className="Minesweeper">

        <div className="gameWrapper" >

          <div className='controls' >
            <p id='usernameDisplay'>{this.state.username}</p>
            <input id='username' placeholder="Type Your Name" onChange={(e) => this.setState({username: e.target.value})} value={this.state.username} />
            <div className='btn' id="startBtn" onClick={() => this.startNewGame()} > New Game </div>
            <div className='btn' id="highScoresBtn" onClick={() => this.toggleShowHighScores()} > High Scores </div>
          </div>

          <div className='canvasWrapper'>
            <canvas width='600' height='600' id='canvas' onMouseUp={(e) => this.handleClick(e)} ></canvas>
            <div id='messageDiv' ></div>
          </div>

          <ul className='instructions'>
            <li>Sweep some mines</li>
          </ul>

          { this.state.showHighScores &&
            <div id='highScores'>
              <div className='closeX' onClick={() => this.toggleShowHighScores()} > x </div>
              <table id='highScoresTable'>
                <tbody id='highScoresTableBody'> 
                  {/* High Score data goes here */} 
                </tbody>
              </table>
            </div>
          }

        </div>

      </div>
    );
  }
}


export default Minesweeper;