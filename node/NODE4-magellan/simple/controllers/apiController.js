var voyageModel = require('../models/voyageModel.js');

var apiController = {
  next: function(req, res) {
    // Pull the locationId from the url
    var targetLocation = req.params.locationId;

    // match from the model
    var locationObject = voyageModel[targetLocation];

    // Send the object back if it was found,
    // otherwise send an empty object
    if(locationObject){
      res.send(locationObject);
    } else {
      res.send({});
    }
  }
};

module.exports = apiController;