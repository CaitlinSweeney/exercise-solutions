// We need access to the beglobal module
var Beglobal = require('../models/beglobal');

// Define the api controller
var apiController = {

  // Our api only handles translations for now
  translate: function(req, res) {
    var from = req.body.from;
    var to   = req.body.to;
    var word = req.body.word;

    // Call the translate method to get a translation
    Beglobal.translate(word, from, to, function(err, result) {
      // Create a dataset to send to the client with all relevant information
      var sendData = {
        original:    word,
        translation: result.translation,
        fromLang:    Beglobal.getLanguageByCode(result.from),
        toLang:      Beglobal.getLanguageByCode(result.to)
      };

      // Send the data
      res.send( sendData );
    });
  }

};

module.exports = apiController;