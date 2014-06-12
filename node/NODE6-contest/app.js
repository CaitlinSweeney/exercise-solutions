var express = require('express');
var bodyParser = require('body-parser');

// Pull in our controllers
var submissionsController = require('./controllers/submissions');
var contestController = require('./controllers/contest');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

// Render the homepage
app.get('/', function(req, res) {
	res.render('index');
});

// Submit entry is the form, when accessed as a GET
app.get('/submit-entry', submissionsController.entry);

// Submit entry is the submitted form when accessed as a POST
app.post('/submit-entry', submissionsController.postEntry);

// The voting page
app.get('/vote', contestController.vote);

// When a user has submitted a vote for a given video
app.get('/vote/:youtubeid', contestController.submitVote);

// This will handle the rounds AND the winner view
app.get('/winner', contestController.winner);

// Allow users to reset the contest when a winner has been found
app.get('/reset', contestController.reset);

var server = app.listen(3000, function() {
	console.log('Express server listening on port ' + server.address().port);
});
