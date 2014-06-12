// Base submission class that takes in a name, a youtube video id, a title, and a description
var Submission = function(name, youtubeid, title, description){
  this.name = name;
  this.youtubeid = youtubeid;
  this.title = title;
  this.description = description;

  // Also default to 0 votes
  this.votes = 0;
};

// Collection of submissions
var submissions = [];


// Utility function to take any youtube video url and
// return just the video ID
var convertYoutubeUrl = function(url){
  // use regular expression to refine a given url down to the video id only.
  return url.replace(
    /(?:[https?:]*\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?(\w+)(?:.*)/gi,
    '$1'
  );

  // alternate conversion method without using regular expressions
  /*
  // first, split the url on the querystring ('?')
  var urlOnQuery = url.split('?');
  // if the first part of the url, the path, contains the string 'embed',
  // then this is in the embed format and we just pull the id from the
  // end of the path
  if(urlOnQuery[0].indexOf('embed')>-1){
    var urlOnPath = urlOnQuery[0].split('/');
    data.youtubeid = urlOnPath[urlOnPath.length - 1];
  } else {
    // if this url doesn't have the 'embed' string,
    // then this is in the view format and we need to
    // pull the id from the querystring as v=<id>.
    // First, we split on the querystring variables...
    urlQueryVars = urlOnQuery[1].split('&');
    // then loop through each one, looking for 'v='
    for (var i = 0; i < urlQueryVars.length; i++) {
      if(urlQueryVars[i].indexOf('v=')>-1){
        // if we find 'v=' in this particular variable,
        // use it!
        return urlQueryVars[i].substr(2);
        break;
      }
    };
  }
  */
}

// Provide global access to submissions
module.exports = {

  // Get the full list of submissions as a copied array
  getAll: function(){
    return submissions.slice();
  },

  // Find a single submission by its youtube ID
  findByYoutubeId: function(youtubeid){
    for (var i = 0; i < submissions.length; i++) {
      if(submissions[i].youtubeid === youtubeid){
        return submissions[i];
      }
    };
    return null;
  },

  // Allow adding new submissions to the list
  insert: function(name, youtubeUrl, title, description){
    // convert the given url to the id only
    var newSubmission = new Submission(name, convertYoutubeUrl(youtubeUrl), title, description);
    submissions.push(newSubmission);
    return newSubmission;
  },

  // Remove a submission by the given youtubeid
  remove: function (youtubeid) {
    for (var i = 0; i < submissions.length; i++) {
      if(submissions[i].youtubeid === youtubeid){
        return submissions.splice(i, 1)[0];
      }
    };
  },

  // Empty the entire collection
  clear: function(){
    submissions = [];
  }
};


// TESTING: Will pre-fill the submissions with 8 videos. 8 cat videos, to be exact.

/*
var videoList = [
  'https://www.youtube.com/watch?v=Kdgt1ZHkvnM',
  'https://www.youtube.com/watch?v=_vx1OVLX5Rc&index=2&list=RDKdgt1ZHkvnM',
  'https://www.youtube.com/watch?v=tntOCGkgt98',
  'https://www.youtube.com/watch?v=xEhaVhta7sI&index=4&list=RDKdgt1ZHkvnM',
  'https://www.youtube.com/watch?v=JuxmJ9FYrbQ',
  'https://www.youtube.com/watch?v=hyNpWhfa1VM&index=7&list=RDKdgt1ZHkvnM',
  'https://www.youtube.com/watch?v=IoZo43bO_5o&list=RDKdgt1ZHkvnM&index=8',
  'https://www.youtube.com/watch?v=BmnyORo_slM&list=RDKdgt1ZHkvnM&index=10'
];
for (var i = 0; i < videoList.length; i++) {
  module.exports.insert(
    'Test User',
    videoList[i],
    'Cats ' + i,
    'A sample description ' + i
  );
};
var contest = require('./contest');
contest.acceptingSubmissions = false;
*/