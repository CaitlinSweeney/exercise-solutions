var express = require('express');
var bodyParser = require('body-parser');

var indexController = require('./controllers/indexController.js');
var countriesController = require('./controllers/countriesController.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

// base home-page route
app.get('/', indexController.index);

// handle incoming requests for the list of all countries
app.get('/countries', countriesController.list);

// handle incoming requests for a search through countries
app.post('/search', countriesController.search);

var server = app.listen(6042, function() {
	console.log('Express server listening on port ' + server.address().port);
});
