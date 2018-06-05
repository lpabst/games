import React, { Component } from 'react';

import './GameTemplate.css';

class GameTemplate extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      showHighScores: false,
    }
  }

  startNewGame(){

  }

  toggleShowHighScores(){
    let showHighScores = !this.state.showHighScores;
    this.setState({showHighScores});
  }

  render() {
    return (
      <div className="GameTemplate">

        <div className="gameWrapper" >

          <div className='controls' >
            <p id='usernameDisplay'>{this.state.username}</p>
            <input id='username' placeholder="Type Your Name" onChange={(e) => this.setState({username: e.target.value})} value={this.state.username} />
            <div className='btn' id="startBtn" onClick={() => this.startNewGame} > New Game </div>
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
            <li>The 4 edge walls of the game are fatal and end the game</li>
            <li>Red obstalces pop up every 5 pieces of food or so. You can choose whether hitting them ends the game or deducts 500 points. If they deduct you to a negative score, that will end the game as well.</li>
            <li>Your speed will increase every 2 levels until you reach max speed at level 8. Alternatively, you can start out at the fastest speed if that's your thing.</li>
            <li>If you earn a high score you will be immortalized in the high scores hall of fame unless a more worthy candidate beats you out</li>
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


export default GameTemplate;