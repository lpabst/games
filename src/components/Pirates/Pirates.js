import React, { Component } from 'react';
import axios from 'axios';
import './Pirates.css';

import pirateGame from './pirateGame/pirateGame.js';
import HighScoreTable from './components/HighScoreTable';

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
      },
      shopUpgrades: [
        { title: 'Better Wood!', explanation: 'Increase your shield by 1', repurchasable: false, cost: 20, shield: 1 },
        { title: 'Bigger Cannons!', explanation: 'Increase your damage by 1', repurchasable: false, cost: 20, damage: 1 },
        { title: 'Repairman!', explanation: 'Increase your ship\'s health by 30', repurchasable: false, cost: 30, health: 30 },
        { title: 'Better Aim!', explanation: 'Words stay on the screen for an extra 0.5 seconds', repurchasable: false, cost: 50, wordDuration: 500},
        { title: 'Metal Hull!', explanation: 'Increase your shield by 1', repurchasable: false, cost: 200, shield: 1 },
        { title: 'More Cannons!', explanation: 'Increase your damage by 1', repurchasable: false, cost: 200, damage: 1 },
        { title: 'Repairman!', explanation: 'Increase your ship\'s health by 30', repurchasable: false, cost: 300, health: 30 },
        { title: 'Better Aim!', explanation: 'Words stay on the screen for an extra 0.5 seconds', repurchasable: false, cost: 500, wordDuration: 500},
        { title: 'Big Head (Risky)', explanation: 'Your ship has increased damage of 1, but enemy ships have increased damage of 5', repurchasable: true, cost: 0, damage: 1, enemyDamage: 5},
        { title: 'More Ammo For Everyone! (Risky)', explanation: 'Words appear more often', repurchasable: true, cost: 0, newWordFrequency: -1},
        { title: 'Bribe the Judge!', explanation: '1 extra point per word typed', repurchasable: false, cost: 100, scoreIncrementer: 1 },
      ]
    }

    this.getPiratesHighScores = this.getPiratesHighScores.bind(this);
    this.newPiratesHighScore = this.newPiratesHighScore.bind(this);
    this.buyShopItem = this.buyShopItem.bind(this);
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
      this.getPiratesHighScores();
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

  buyShopItem(i){
    let upgrade = this.state.shopUpgrades[i];
    
    if (upgrade.cost <= this.data.score){
      // carry out effects
      this.data.score -= upgrade.cost ? upgrade.cost : 0;
      this.data.ship.health += upgrade.health ? upgrade.health : 0;
      this.data.ship.increasedDamage += upgrade.damage ? upgrade.damage : 0;
      this.data.ship.shield += upgrade.shield ? upgrade.shield : 0;
      this.data.wordDuration += upgrade.wordDuration ? upgrade.wordDuration : 0;
      this.data.newWordFrequency += upgrade.newWordFrequency ? upgrade.newWordFrequency : 0;
      this.data.enemy.increasedDamage += upgrade.enemyDamage ? upgrade.enemyDamage : 0;
      this.data.scoreIncrementer += upgrade.scoreIncrementer ? upgrade.scoreIncrementer : 0;

      // remove from array if not repurchasable
      if (!this.state.shopUpgrades[i].repurchasable){
        let newShop = JSON.parse(JSON.stringify(this.state.shopUpgrades));
        newShop.splice(i, 1);
        this.setState({shopUpgrades: newShop});
      }else{
        // if it is repurchasable, refresh the DOM so that the score/health update
        this.forceUpdate();
      }
    }

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
              <p className='shopHeader' >**Note - Your score is your currency, so spend it wisely**</p>
              <p className='shopHeader' >Score: {this.data.score} pts</p>
              <p className='shopHeader' >Health: {this.data.ship.health}</p>
              <p className='shopHeader' >Shield: {this.data.ship.shield}</p>
              <p className='shopHeader' >Addt'l Damage: {this.data.ship.increasedDamage}</p>
              <br />

              { this.state.shopUpgrades.map( (item, i) => {

                  let background = (item.cost <= this.data.score) ? '#88ff88' : '#ff8888';
                  return  <div key={i} className='shopItem' onClick={() => this.buyShopItem(i)} >
                    <p> {item.title} </p>
                    <p style={{background, width: 'fit-content', padding: '2px'}}>Cost: {item.cost} pts</p>
                    <p> {item.explanation} </p>
                  </div>

                })
              }
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
              
              <p className='highScoresHeader' >High Scores</p>

              <HighScoreTable title='Hard' rows={this.state.highScores.hard} />
              <HighScoreTable title='Medium' rows={this.state.highScores.medium} />
              <HighScoreTable title='Easy' rows={this.state.highScores.easy} />

            </div>
          }

        </div>

      </div>
    );
  }
}

export default Pirates;