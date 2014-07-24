var express = require('express');
var indexController = require('./controllers/indexController.js');
var apiController = require('./controllers/apiController.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// If the user has completed the journey
app.get('/complete', indexController.complete);

// Api path for getting raw JSON data about the location
app.get('/next/:locationId', apiController.next);

// Path to handle viewing locations themselves
app.get('/:locationId?', indexController.index);

var server = app.listen(6760, function() {
	console.log('Express server listening on port ' + server.address().port);
});
