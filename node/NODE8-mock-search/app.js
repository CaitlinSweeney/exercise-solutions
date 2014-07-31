var express = require('express');
var bodyParser = require('body-parser');

// Our main controller
var indexController = require('./controllers/indexController.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

// Route for the homepage
app.get('/', indexController.index);

// Post route for searches
app.post('/search', indexController.search);

var server = app.listen(3215, function() {
	console.log('Express server listening on port ' + server.address().port);
});
