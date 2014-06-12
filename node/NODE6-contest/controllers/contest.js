var Submission = require('../models/submission');
var Contest = require('../models/contest');

module.exports = {
  // Handle showing the vote page
  vote: function (req, res) {

    // Pull in all submissions thus far
    var submissions = Submission.getAll();

    // If there is one or fewer submissions, just go to the winnner page
    if(submissions.length <= 1){
      return res.redirect('/winner');
    }

    // Pick a random item from the list of submissions
    var randomIndex1 = Math.floor(Math.random() * submissions.length);
    var randomIndex2 = randomIndex1;
    // Pick another random item that isn't equal to the first choice
    while(randomIndex2 === randomIndex1){
      randomIndex2 = Math.floor(Math.random() * submissions.length);
    }

    // Render the vote template and pass it the two random videos
    res.render('vote', {
      video1: submissions[randomIndex1],
      video2: submissions[randomIndex2],
    });
  },

  // Handle the user clicking on vote
  submitVote: function (req, res) {
    // Grab the video id from the url
    var youtubeid = req.param('youtubeid');

    // Get that specific submission
    var submission = Submission.findByYoutubeId(youtubeid);

    // Increment the number of votes
    submission.votes++;

    // Show the vote page again with two new random videos
    res.redirect('/vote');
  },

  // This will either be a round or show the final winner
  winner: function (req, res) {

    // Pull all submissions
    var allSubmissions = Submission.getAll();

    // compare every other video
    var removedSubmissions = [];
    if(allSubmissions.length > 1){
      for (var i = 0; i < allSubmissions.length; i+=2) {
        var vid1 = allSubmissions[i];
        var vid2 = allSubmissions[i+1];

        // Remove the video with the lesser number of votes
        if(vid1.votes > vid2.votes)
          removedSubmissions.push( Submission.remove(vid2.youtubeid) );
        else
          removedSubmissions.push( Submission.remove(vid1.youtubeid) );
      };
    }

    // Render the winner template and pass the information about what's changed
    res.render('winner', {
      allSubmissions: allSubmissions,
      remainingSubmissions: Submission.getAll(),
      removedSubmissions: removedSubmissions
    });
  },

  // Allow users to start a new contest
  reset: function(req,res){

    // Only allow reset if the current contest is over and a winner is declared
    if(!Contest.acceptingSubmissions && Submission.getAll().length === 1){
      Contest.acceptingSubmissions = true;
      Submission.clear();
    }

    // Go back to the homepage
    res.redirect('/');
  }
};