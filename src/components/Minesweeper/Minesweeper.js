import React, { Component } from 'react';
import './Minesweeper.css';

class Minesweeper extends Component {
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
      <div className="Minesweeper">

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