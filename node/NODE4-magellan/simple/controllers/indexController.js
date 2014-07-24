var voyageModel = require('../models/voyageModel.js');

var indexController = {
  index: function(req, res){
    // Pull the locationId from the url
    var targetLocation = req.params.locationId;
    if(!targetLocation){
      targetLocation = 'seville';
    }

    // match from the model
    var locationObject = voyageModel[targetLocation];

    // If location is valid, render the location data
    if(locationObject){
      res.render('voyageStop', {
        location: locationObject
      });
    } else {
      // If location is invalid, render the error view
      res.render('voyageError', {
        target: targetLocation
      });
    }
  },
  complete: function(req, res){
    res.render('voyageComplete');
  }
};

module.exports = indexController;