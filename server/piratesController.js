var app = require('./index.js');

module.exports = {
  getPiratesHighScores: function(req, res){
    let db = req.app.get('db');
    db.getPiratesHighScoresEasy()
    .then( easyScores => {
      db.getPiratesHighScoresMedium()
      .then( mediumScores => {
        db.getPiratesHighScoresHard()
        .then( hardScores => {
          return res.status(200).send({
            error: false,
            message: 'Retrieved high scores for all difficulties',
            easy: easyScores,
            medium: mediumScores,
            hard: hardScores
          });
        }).catch(err=> {})
      }).catch(err=> {})
    }).catch(err=> {})
  },

  newPiratesHighScore: function(req, res){
    let db = req.app.get('db');

    let { name, score, difficulty } = req.body;

    if (!name.match(/[a-z0-9]/i)) name = 'anonymous';

    db.newPiratesHighScore([name, score, difficulty])
    .then( response => {

      // clean high scores table for whatever difficulty we just added a new result to
      let keepHowManyRowsPerDifficulty = 25;
      db.cleanHighScoresTable([difficulty, keepHowManyRowsPerDifficulty-1])
      .then( done => {})
      .catch(err => {})

      // alert front end we are done
      return res.status(200).send({
        error: false,
        message: 'Added new high score to the db',
      });

    }).catch(err => {})
  }
  
};
