// Base contest class
var Contest = function(){
  this.acceptingSubmissions = true;
};

// Create a single instance of a contest
var contest = new Contest();

// Allow other files to access the contest
module.exports = contest;