
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongoose = require('mongoose');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//connect mongoose to mongo: PART III.
mongoose.connect('mongodb://localhost/refactorU');

var Applicant = mongoose.model('Applicant', { 
  name:   String,
  bio:    String,
  skills: String,
  years:  String,
  why:    String 
});

//renders the index page
app.get('/', function(req, res){
	res.render('index')
});

// displays a list of applicants
app.get('/applicants', function(req, res){

	// display data from database: PART: IV.
	Applicant.find( function(error, data) {
      if (error) 
        console.log( 'cannot read applicants' );
      else 
        res.render( 'applicants', {applicantData: data} );
    });

});

// creates an applicant: PART II.
app.post('/applicant', function(req, res){

	console.log("Submit_Received:", req.body);

	res.send({success : 'Success!'})

	// store data from body post: PART III.
	var application = new Applicant({ 
	  name:   req.body.name,
	  bio:    req.body.bio,
	  skills: req.body.skills,
	  years:  req.body.years,
	  why:    req.body.why 
	});

	application.save()
});

// delete an applicant: BONUS I.
app.post('/deleteApplicant', function(req, res){

	Applicant.remove( {_id:req.body.id}, function(error){
		if(error) {
			console.log('Could not remove applicant.')
			res.send('Could not remove applicant.')
		} else {
			console.log('Successful Delete.', req.body.id)
			res.send({success : 'Success!'})
		}
	});

});

// show applicant data: BONUS II.
app.get('/:userid', function(req, res){

    Applicant.findById(req.params.userid, function (error, data){
        if(error){
        	console.log('Could not find user.')
        	res.send('Could not find user.')
        } else {
            console.log("Show Details:", req.params.userid);
            res.render('applicant', data)
        }
    });

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
