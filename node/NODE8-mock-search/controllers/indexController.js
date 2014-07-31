var searchModel = require('../models/searchModel.js');


/**
 * Helper for semi-fuzzy searching for a string inside a string
 * @param  {string} needle   String to search for
 * @param  {string} haystack String to search within
 * @return {bool}          If the search found a match
 */
var fuzzyMatch = function(needle, haystack) {
  // force same case on both strings
  var fixedNeedle = needle.toUpperCase();
  var fixedHaystack = haystack.toUpperCase();

  // Use indexOf to check for any occurances.
  // -1 if none found, positive index if found
  if(fixedHaystack.indexOf(fixedNeedle) > -1){
    return true;
  } else {
    return false;
  }
}

var indexController = {
  index: function(req, res) {
    res.render('index');
  },
  search: function(req, res) {
    // Pull the term from the posted data
    var term = req.body.term;

    // Results placeholder
    var results = [];

    // because our data-set is up to 3 levels deep,
    // let's search each level.
    for(var category in searchModel){
      for(var item in searchModel[category]){
        // If the term is found in either the title of the item
        // or within the description, this item is considered a match.
        if(fuzzyMatch(term, item) || fuzzyMatch(term, searchModel[category][item].desc)){

          // Since we want to keep the title and the desc,
          // put together a new object with both and pass to
          // results array.
          results.push({
            title: item,
            desc: searchModel[category][item].desc
          });
        }
      };
    };

    // Send any results as JSON to the client
    res.send(results);
  }
};

module.exports = indexController;