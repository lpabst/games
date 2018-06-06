import React, { Component } from 'react';
import axios from 'axios';
import './Pirates.css';

import pirateGame from './pirateGame/pirateGame.js';

class Pirates extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      showHighScores: false,
      showShop: false,
      difficulty: 'Easy',
      highScores: {
        easy: [],
        medium: [],
        hard: []
      }
    }

    this.getPiratesHighScores = this.getPiratesHighScores.bind(this);
    this.newPiratesHighScore = this.newPiratesHighScore.bind(this);
  }

  componentDidMount(){
    this.getPiratesHighScores();
  }

  getPiratesHighScores(){
    axios.get('/api/getPiratesHighScores')
    .then( res => {
      if (!res || !res.data) return;

      let highScores = {
        easy: res.data.easy,
        medium: res.data.medium,
        hard: res.data.hard
      }

      this.setState({highScores});
    })
  }

  newPiratesHighScore(score){
    axios.post('/api/newPiratesHighScore', {
      name: this.state.username,
      score: score || 0,
      difficulty: this.state.difficulty
    })
    .then (res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  startNewGame(){
    // Pass this as a param so the other file can set state
    pirateGame.init(this.state.difficulty, this);
  }

  toggleShowHighScores(){
    let showHighScores = !this.state.showHighScores;
    this.setState({showHighScores});
  }

  toggleShop(){
    this.setState({
      showShop: !this.state.showShop
    })
  }

  render() {
    return (
      <div className="pirates">

        <div className="gameWrapper" >

          <div className='controls' >
            <p id='usernameDisplay'>Username: {this.state.username}</p>
            <input id='username' placeholder="Type Your Name" onChange={(e) => this.setState({username: e.target.value})} value={this.state.username} />
            <p>Difficulty</p>
            <select value={this.state.difficulty} onChange={(e) => this.setState({difficulty: e.target.value})} >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
            <div className='btn' id="startBtn" onClick={() => this.startNewGame()} > New Game </div>
            <div className='btn' id="highScoresBtn" onClick={() => this.toggleShowHighScores()} > High Scores </div>
            <div className='btn' id='toggleShop'> Shop </div>
          </div>

          <div className='canvasWrapper'>
            <canvas width='600' height='600' id='canvas'></canvas>
            <div id='messageDiv' ></div>
            <div id='typedWord' ></div>
          </div>

          { this.state.showShop && 
            <div id='shopWrapper' >
              <div className='shopItem' >
                <p>Title: Better Wood</p>
                <p>Cost: 20 pts</p>
                <p>Explanation: Increase your shield by 1</p>
              </div>
            </div>
          }

          <ul className='instructions'>
            <li>You are the captain of a ship being attacked by pirates! Your ship starts with 100 health and a shield/hull thickness of 2</li>
            <li>Type out words that appear on the screen. As you type the white words, your cannons fire and the enemy ships take damage</li>
            <li>If it takes too long to type a word, it will disappear off your screen, and the enemy ship's cannons will fire at your ship</li>
            <li>Every now and then a green word will appear, which repairs your ship for 2 health if you type it fast enough. If it disappears off the screen before you type it, no damage is taken</li>
            <li>The damage a word causes is equal to the length of the word, minus the shield of the ship being attacked. So a 7 letter word hitting a ship with 2 shield would cause 5 damage</li>
            <li>You can see what you have typed right above the game board</li>
            <li>Hitting Enter will clear what you've already typed, Backspace and Delete remove 1 letter from the end of what you've typed</li>
            <li>*Optionally, you can spend your hard earned points on upgrades in the shop. Opening the upgrade menu will also pause the game</li>
            <li>Toggle the shop by pressing the right arrow, OR clicking the shop button above the game board</li>
          </ul>

          { this.state.showHighScores &&
            <div id='highScores'>
              <div className='closeX' onClick={() => this.toggleShowHighScores()} > x </div>
              <table id='highScoresTable'>
                <tbody id='highScoresTableBody'> 
                  {
                    this.state.highScores.easy.map( (item, i) => {
                      return <tr key={i} >
                        <td>Score: {item.score}</td>
                        <td>Name: {item.name}</td>
                      </tr>
                    })
                  }
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