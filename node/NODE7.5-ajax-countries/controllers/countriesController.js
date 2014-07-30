var countriesModel = require('../models/countriesModel.json');

var countriesController = {
  list: function(req, res) {
    // Just send the whole list down to the client
    res.send(countriesModel);
  },
  search: function(req, res) {
    // Pull out the search term from the request body
    var term = req.body.country;

    // Set up an empty array to hold our matches
    var results = [];
    // Loop through all countries to see which match
    for (var i = 0; i < countriesModel.length; i++) {

      // the fixed term is forced to uppercase
      var fixedTerm = term.toUpperCase();

      // the country name is also forced to match the case of the term
      var fixedCountry = countriesModel[i].name.toUpperCase();

      // if the country contains the search term at any location in the string,
      // then indexOf will return a positive number. If a match is not found,
      // indexOf returns -1. We check to see if we get a positive number
      // which indicates a match for this country's name.
      if(fixedCountry.indexOf(fixedTerm) > -1){

        // Because we found a match, push to our result list
        results.push(countriesModel[i]);
      }
    };

    // Send any results that were found to the client
    res.send(results);
  }
};

module.exports = countriesController;