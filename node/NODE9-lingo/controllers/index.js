var Beglobal = require('../models/beglobal');
var User = require('../models/user');

// Define the index controller
var indexController = {

  // Our home-page handler
	index: function(req, res) {

    // Find our user. There will only ever be one
    // user for this basic demo, but the code shouldn't
    // stray far when implementing multiple users.
    User.findOne({}, function(err, user) {

      // Render the homepage with a list of all the languages
  		res.render('index', {
        languages: Beglobal.getLanguages(),
        userLanguage: user.language
      });
    });
	}
};

module.exports = indexController;