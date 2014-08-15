var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var indexController = require('./controllers/index.js');
var apiController = require('./controllers/apiController.js');
var quizController = require('./controllers/quizController.js');

mongoose.connect('mongodb://localhost/lingo');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

// Handle the index controller
app.get('/', indexController.index);

// Api events for translation
app.post('/translate', apiController.translate);

// Quiz-specific routes
app.get('/start-quiz', quizController.start);
app.post('/answer-question', quizController.answerQuestion);
app.get('/next-question', quizController.nextQuestion);
app.get('/results', quizController.results);
app.get('/stats', quizController.stats);
app.get('/reset', quizController.reset);

var server = app.listen(7427, function() {
	console.log('Express server listening on port ' + server.address().port);
});
