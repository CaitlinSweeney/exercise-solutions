var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  // What language we are testing with
  language: String,
  // Possible word bank for the quiz
  wordBank: [String],
  // Details about the currently active quiz
  activeQuiz: {
    quizType: String,
    questions: [{
      original: String,
      translation: String,
      passed: Boolean
    }]
  },
  // All the words the user has been tested on
  words: [{
    original: String,
    passedCount: Number,
    failedCount: Number,
    lastTested: Date
  }],
  // All the user's quizzes data
  quizzes: {
    passed: Number,
    failed: Number
  }
});

var User = module.exports = mongoose.model('user', UserSchema);


// create a fake user if the DB is empty
User.find({}, function(err, docs) {
  if(docs.length === 0){
    var user = new User({

    });
    user.save();
  }
});