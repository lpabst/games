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
            <li>You are the captain of a ship being attacked by pirates! Your ship starts with 100 health and a shield/hull thickness of 2</li>
            <li>Type out words that appear on the screen. As you type the words, your cannons fire and the enemy ships take damage</li>
            <li>If it takes too long to type a word, it will disappear off your screen, and the enemy ships' cannons will fire at your ship</li>
            <li>The damage a word causes is equal to the length of the word, minus the shield of the ship being attacked. So a 7 letter word hitting a ship with 2 shield would cause 5 damage</li>
            <li>*Optionally, you can spend your hard earned points on upgrades in the upgrades menu. Opening the upgrade menu will also pause the game</li>
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