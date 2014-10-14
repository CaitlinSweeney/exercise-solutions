var express = require('express');
var fs = require('fs');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
	fs.readFile('data.txt', function(err, contents) {
        res.header('Content-Type', 'text/html');
        res.send(contents);
    });
});

// dynamic url structure. allow the url to
// act like variables too!
// Try navigating to http://localhost:4552/test.txt
// to load the test.txt file from the public directory
app.get('/:filename', function(req, res){
    fs.readFile('./public/' + req.params.filename, function(err, contents) {
        res.header('Content-Type', 'text/html');
        res.send(contents);
    });
});

var server = app.listen(4552, function() {
	console.log('Express server listening on port ' + server.address().port);
});
