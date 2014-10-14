var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// This will allow express to read in submitted data
// and parse it into a useable JS object. By having this
// globally, any route following this line will have a
// submitted body parsed (if there is one to parse) and it
// will be accessible by req.body
app.use(bodyParser.urlencoded({extended: false}));

// Handle the homepage
app.get('/', function(req, res) {
	res.render('index');
});

// Allow posting to the formsubmit url, which
// will just redirect the user to a success page
app.post('/formsubmit', function(req, res){
    // Print the submitted data to command line
    console.log(req.body);
    // Tell express to just send us to the success url
    res.redirect('/success');
});

// Render the success page.
app.get('/success', function(req, res){
    res.render('success');
});

var server = app.listen(9319, function() {
	console.log('Express server listening on port ' + server.address().port);
});
