var app = require('./index.js');

module.exports = {
  getMinesweeperHighScores: function(req, res){
    let db = req.app.get('db');
    db.getMinesweeperHighScores()
    .then( highScores => {
      return res.status(200).send({
          error: false,
          message: 'Retrieved high scores',
          highScores: highScores
        });
    }).catch(()=> {})
  },

  newMinesweeperHighScore: function(req, res){
    let db = req.app.get('db');
    let { timeElapsed, username } = req.body;

    if (!username.match(/[a-z0-9]/i)) username = 'anonymous';

    db.newMinesweeperHighScore([username, timeElapsed])
    .then( () => {

      // clean high scores table for whatever difficulty we just added a new result to
      let keepHowManyHighScores = 20;
      db.cleanMinesweeperHighScores([keepHowManyHighScores-1])
      .then( () => {})
      .catch(() => {})

      // alert front end we are done
      return res.status(200).send({
        error: false,
        message: 'Added new high score to the db',
      });

    }).catch(() => {})
  }
  
};
