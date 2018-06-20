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

  startNewGame(){
    minesweeper.init(this);
  }

  toggleShowHighScores(){
    let showHighScores = !this.state.showHighScores;
    this.setState({showHighScores});
  }

  handleClick(e){
    let { cellWidth, board } = this.data;
    let bounds = e.target.getBoundingClientRect();
    let x = e.clientX - bounds.left;
    let y = e.clientY - bounds.top;
    let i = Math.floor(x/cellWidth);
    let j = Math.floor(y/cellWidth);
    this.data.board[i][j].click();

    if (this.data.board[i][j].isVisible && this.data.board[i][j].isBomb){
      this.data.gameOver = true;
    }

    // reveal all neighboring cells with 0 neighboringBombs
    function openEmptySpace(i, j){
      if (board[i-1] && board[i-1][j-1]) board[i-1][j-1].reveal();
      if (board[i-1] && board[i-1][j]) board[i-1][j].reveal();
      if (board[i-1] && board[i-1][j+1]) board[i-1][j+1].reveal();
      if (board[i]   && board[i][j-1]) board[i][j-1].reveal();
      if (board[i]   && board[i][j+1]) board[i][j+1].reveal();
      if (board[i+1] && board[i+1][j-1]) board[i+1][j-1].reveal();
      if (board[i+1] && board[i+1][j]) board[i+1][j].reveal();
      if (board[i+1] && board[i+1][j+1]) board[i+1][j+1].reveal();
    }

    if (this.data.board[i][j].isVisible && this.data.board[i][j].neighboringBombs === 0){
      openEmptySpace(i, j)
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
            <canvas width='600' height='600' id='canvas' onClick={(e) => this.handleClick(e)} ></canvas>
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