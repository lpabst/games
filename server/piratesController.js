var app = require('./index.js');

module.exports = {
  getPiratesHighScores: function(req, res){
    let db = req.app.get('db');
    return res.status(200).send('ok');
  },

  newPiratesHighScore: function(req, res){
    let db = req.app.get('db');
    return res.status(200).send('ok');
  }
  
};
