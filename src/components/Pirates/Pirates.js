import React, { Component } from 'react';

import './Pirates.css';

import pirateGame from './pirateGame/pirateGame.js';

class Pirates extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      showHighScores: false,
    }
  }

  startNewGame(){
    pirateGame.init();
  }

  toggleShowHighScores(){
    let showHighScores = !this.state.showHighScores;
    this.setState({showHighScores});
  }

  render() {
    return (
      <div className="pirates">

        <div className="gameWrapper" >

          <div className='controls' >
            <p id='usernameDisplay'>Username: {this.state.username}</p>
            <input id='username' placeholder="Type Your Name" onChange={(e) => this.setState({username: e.target.value})} value={this.state.username} />
            <div className='btn' id="startBtn" onClick={() => this.startNewGame()} > New Game </div>
            <div className='btn' id="highScoresBtn" onClick={() => this.toggleShowHighScores()} > High Scores </div>
          </div>

          <div className='canvasWrapper'>
            <canvas width='600' height='600' id='canvas'></canvas>
            <div id='messageDiv' ></div>
          </div>

          <ul className='instructions'>
            <li>Earn points by eating the green pieces of food and staying alive longer</li>
            <li>Use the arrows to change directions</li>
            <li>Space Bar pauses the game</li>
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


export default Pirates;