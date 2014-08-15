var User = require('../models/user.js');
var beglobal = require('../models/beglobal');
var _ = require('underscore');

// Define global values for the number of questions per quiz,
// the maximum a user can fail per quiz, and the
// minimum number of quizzes before the user is allowed to
// hand-pick the quiz type
var MAX_QUESTIONS = 10;
var MAX_INCORRECT = 3;
var QUIZ_MIN_COUNT = 3;


// Define the quiz controller
var quizController = {

  // Allow the user to reset their account
  reset: function(req, res){
    User.findOne({}, function(err, user) {
      user.language = '';
      user.wordBank = [];
      user.activeQuiz.questions = [];
      user.words = [];
      user.quizzes = {};
      user.save(function(err, doc) {
        res.redirect('/');
      });
    });
  },

  // Start a new quiz by setting the DB language
  // and redirect to nextQuestion
  start: function(req, res) {
    User.findOne({}, function(err, user) {

      // If the language was passed, update our user's language
      if(req.query.language){
        user.language = req.query.language;
      }

      // Clear out the current word bank
      user.wordBank = [];

      // If this quiz type is not a random one
      if(req.query.type && req.query.type !== 'random'){
        user.activeQuiz.quizType = req.query.type;


        // figure out which word bank to use
        // Sort all the words by their pass/fail ratio
        var wordsSortedDifficulty = _.sortBy(user.words, function(item) {
          return (item.passedCount || 0) / (item.failedCount || 0);
        }).reverse();

        // Sort all the words by their last test timestamp
        var wordsSortedDate = _.sortBy(user.words, function(item) {
          return (item.lastTested || 0);
        }).reverse();

        // Sort the words based on how much they've been practiced
        var wordsSortedPracticed = _.sortBy(user.words, function(item) {
          return (item.passedCount || 0) + (item.failedCount || 0);
        });

        var bank = [];

        switch(req.query.type){
          case 'hardest':
            // Grab the hardest words from the list
            bank = _.last(wordsSortedDifficulty, MAX_QUESTIONS);
            break;
          case 'least':
            // Get the least practiced words
            bank = _.first(wordsSortedPracticed, MAX_QUESTIONS);
            break;
          case 'recent':
            // Get the most recently tested words
            bank = _.first(wordsSortedDate, MAX_QUESTIONS);
            break;
        }

        // clean up the wordbank so it is just words, not objects of words
        user.wordBank = bank.map(function(item) {
          return item.original;
        });

      } else {
        // Default to random quiz
        user.activeQuiz.quizType = 'random';
      }

      // Clear out the questions
      user.activeQuiz.questions = [];

      // Kick off the quiz with an initial question
      beglobal.generateQuestion(user.wordBank, user.language, function(err, word, translation, wordBank) {
        user.activeQuiz.questions.push({
          original: word,
          translation: translation.translation
        });
        // Questions that are generated allow us to clear out the wordbank
        user.wordBank = wordBank;

        // save the question and types and wordbank
        user.save(function(err, doc) {
          // send the user the next question contents
          res.redirect('/next-question');
        });
      });

    });
  },

  // Check this question's answer from the user.
  // Send back the results.
  answerQuestion: function(req, res){
    User.findOne({}, function(err, user) {
      // Find the current question from the DB
      var currentQuestion = user.activeQuiz.questions[user.activeQuiz.questions.length - 1];

      // Check if this question is the last one in the current quiz
      var endOfQuiz = user.activeQuiz.questions.length >= MAX_QUESTIONS;

      // Run comparison of given answer to proper result
      beglobal.checkTranslation(req.body.answer, currentQuestion.translation, function(err, result) {

        currentQuestion.passed = result.correct;

        // See if this word has already been practiced before
        var userWord = _.find(user.words, function(item) {
          return item.original === currentQuestion.original;
        });

        // Check if the word has been passed or failed and store as a string
        var wordKey = (currentQuestion.passed)? 'passed' : 'failed';

        if(userWord){
          // The user has already practiced this word, so update the count
          if(userWord[wordKey + 'Count'])
            userWord[wordKey + 'Count']++;
          else
            userWord[wordKey + 'Count'] = 1;

          userWord.lastTested = new Date();
        } else {
          // User hasn't seen this word before, so add it to the DB
          userWord = {
            original: currentQuestion.original
          };
          userWord[wordKey + 'Count'] = 1;
          userWord.lastTested = new Date();
          user.words.push(userWord);
        }

        // Alert mongoose that the "words" field in the DB has been changed
        user.markModified('words');

        // Save changes
        user.save(function(err, doc) {

          // Send back the result of the answer and let the page
          // know if the quiz has ended or not
          res.send({
            answer: req.body.answer,
            language: beglobal.getLanguageByCode(user.language).name,
            question: currentQuestion,
            result: result,
            endOfQuiz: endOfQuiz
          });

          // If this isn't the end of the quiz...
          if(!endOfQuiz){
            // ...generate and save a new question
            beglobal.generateQuestion(user.wordBank, user.language, function(err, word, translation, wordBank) {
              user.activeQuiz.questions.push({
                original: word,
                translation: translation.translation
              });
              user.wordBank = wordBank;

              user.save();
            });
          }

        });
      });
    });
  },

  // Send a new question to the user.
  // This should include the original word
  // as well as the target language.
  nextQuestion: function(req, res) {
    User.findOne({}, function(err, user) {
      var currentQuestion = user.activeQuiz.questions[user.activeQuiz.questions.length - 1];
      res.send({
        word: currentQuestion.original,
        language: beglobal.getLanguageByCode(user.language).name
      });

    });
  },

  // Final step in the set. Show stats about
  // the quiz the user just completed
  results: function(req, res) {
    User.findOne({}, function(err, user) {

      // Find out how many questions were passed or failed
      var questionResults = _.countBy(user.activeQuiz.questions, function(question) {
        return question.passed?'pass':'fail';
      });

      // Update the quiz details in the DB
      var quizPassed = (questionResults["fail"] || 0) <= MAX_INCORRECT;
      var quizKey = quizPassed ? 'passed' : 'failed';

      if(!user.quizzes[quizKey])
        user.quizzes[quizKey] = 1;
      else
        user.quizzes[quizKey]++;

      user.save(function(err, doc) {

        res.send({
          quiz: user.activeQuiz,
          quizResults: {
            questionResults: questionResults,
            maxIncorrect: MAX_INCORRECT,
            passed: quizPassed,
            // If the total quiz count is more than the min quiz count,
            // allow the user to actually pick types besides "random"
            allowQuizType: (user.quizzes.passed || 0) + (user.quizzes.failed || 0) >= QUIZ_MIN_COUNT
          }
        });
        
      })
    });
  },

  // Render user stats
  stats: function(req, res){
    User.findOne({}, function(err, user) {
      var quizzesPassed = (user.quizzes.passed || 0);
      var quizzesFailed = (user.quizzes.failed || 0);
      var totalQuizzes = quizzesPassed + quizzesFailed;
      var quizPassedPercent = (quizzesPassed / totalQuizzes);
      var wordsPassed = _.reduce(user.words, function(count, item) {
        return (item.passedCount || 0) + count;
      }, 0);
      var wordsFailed = _.reduce(user.words, function(count, item) {
        return (item.failedCount || 0) + count;
      }, 0);
      var totalWords = wordsPassed + wordsFailed;
      var wordsPassedPercent = wordsPassed/totalWords;

      var wordsSorted = _.sortBy(user.words, function(item) {
        return (item.passedCount || 0) / (item.failedCount || 0);
      }).reverse();
      var wordsBest = _.first(wordsSorted, MAX_QUESTIONS);
      var wordsWorst = _.last(wordsSorted, MAX_QUESTIONS);


      res.send({
        quizzesPassed: quizzesPassed,
        quizzesFailed: quizzesFailed,
        totalQuizzes: totalQuizzes,
        quizPassedPercent: quizPassedPercent,
        wordsPassed: wordsPassed,
        wordsFailed: wordsFailed,
        totalWords: totalWords,
        wordsPassedPercent: wordsPassedPercent,
        wordsBest: wordsBest,
        wordsWorst: wordsWorst
      });
    });
  }
};

module.exports = quizController;