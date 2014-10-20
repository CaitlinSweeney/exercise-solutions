var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

//connect mongoose to mongo: PART III.
mongoose.connect('mongodb://localhost/refactorU');

var Applicant = mongoose.model('Applicant', {
  name:   String,
  bio:    String,
  skills: String,
  years:  String,
  why:    String
});

app.get('/', function(req, res) {
  res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
  Applicant.find( function(error, data) {
    if (error)
      console.log( 'cannot read applicants' );
    else
      res.render( 'applicants', {applicantData: data} );
  });
});

app.get('/success', function(req, res){
  res.render('success');
});

// creates an applicant: PART II.
app.post('/applicant', function(req, res){

  console.log("Submit_Received:", req.body);

  res.redirect('/success');

  // store data from body post: PART III.
  var application = new Applicant({
    name:   req.body.name,
    bio:    req.body.bio,
    skills: req.body.skills,
    years:  req.body.years,
    why:    req.body.why
  });

  application.save();
});

// delete an applicant: BONUS I.
app.get('/deleteApplicant/:userid', function(req, res){

  Applicant.remove( {_id:req.params.userid}, function(error){
    if(error) {
      console.log('Could not remove applicant.');
      res.send('Could not remove applicant.');
    } else {
      console.log('Successful Delete.', req.params.userid);
      res.redirect('/applicants');
    }
  });

});

// show applicant data: BONUS II.
app.get('/:userid', function(req, res){

  Applicant.findById(req.params.userid, function (error, data){
    if(error){
      console.log('Could not find user.');
      res.send('Could not find user.');
    } else {
      console.log("Show Details:", req.params.userid);
      res.render('applicant', data);
    }
  });

});

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
