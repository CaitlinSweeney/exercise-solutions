var Submission = require('../models/submission');
var contest = require('../models/contest');

module.exports = {
  // Show the new entry page
  entry: function(req, res){

    // Pass along boolean representing whether or not the current contest
    // is accepting new submissions
    res.render('newEntry', {
      acceptingSubmissions: contest.acceptingSubmissions
    });
  },

  // Handle new entries
  postEntry: function(req, res){

    // If the contest isn't accepting new entries, just redirect to the vote page
    if(!contest.acceptingSubmissions){
      return res.redirect('/vote');
    }

    // retrieve the form data
    var data = req.body;

    // create and save a new entry
    var newEntry = Submission.insert(data.name, data.url, data.title, data.description);

    // If this entry puts us at least to 8 entries, set contest
    // to no longer accept submissions
    if(Submission.getAll().length >= 8){
      contest.acceptingSubmissions = false;
    }

    // Send to the vote page
    res.redirect('/vote');
  }
};