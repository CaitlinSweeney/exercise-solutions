var NodeBeglobal = require('node-beglobal');
var randomWords = require('random-words');
var _ = require('underscore');

var beglobal = new NodeBeglobal.BeglobalAPI({
  api_token: 'JZq1FSNibb%2FuaTLaSeogwA%3D%3D'
});

// Holds a list of all the unique languages that
// can be translated to and from
var uniqueLanguages = [];

// Helper for retrieving the item's code
var getLanguageCode = function(item) {
  return item.code;
};

// Ask beGlobal for a list of all languages
beglobal.languages.all(function(err, results) {
  // Update the value of uniqueLanguages using Underscore
  // to get only unique items and sorting them alphabetically
  uniqueLanguages = _.chain(results)
    .pluck('to')
    .uniq(getLanguageCode)
    .sortBy(getLanguageCode)
    .value();
});

module.exports = {
  // Return only the unique languages
  getLanguages: function() {
    return uniqueLanguages;
  },

  // Given a language code, return the matching language object
  getLanguageByCode: function(code) {
    return _.find(uniqueLanguages, function(item) {
      return item.code === code;
    });
  },

  // Given a word, to code, and from code, perform a translation
  // and pass the details back to the callback of onComplete
  translate: function(word, fromCode, toCode, onComplete) {
    beglobal.translations.translate({
        text: word,
        from: fromCode,
        to: toCode
      },
      function(err, translation) {
        onComplete(err, translation);
      }
    );
  },

  // Build a new question based on the wordbank (or a random word if
  // the wordbank is empty), find the translation, and pass everything
  // down to the onComplete
  generateQuestion: function(wordBank, toCode, onComplete){
    // get a random word, translate it, and send that back
    var word;
    
    if(wordBank && wordBank.length > 0){
      // use the wordbank array as the source
      var index = _.random(wordBank.length - 1);
      // Splice out the used word
      word = wordBank.splice(index, 1)[0];
    } else {
      // bank specified, so use the random word generator
      word = randomWords();
    }
    this.translate(word, 'eng', toCode, function(err, translation) {
      onComplete(err, word, translation, wordBank);
    });
  },

  /**
   * Given a translation and a guess, calculate the correctness
   * of the answer and give details.
   * @param  {string} word        The guess/answer
   * @param  {string} translation The actual translation
   * @param  {function} onComplete  Function to call on completion
   */
  checkTranslation: function(word, translation, onComplete) {
    var error = null;
    var results = [];

    // Reference to possible accent characters and their actual english
    // counterpart.
    var accents = 'ÀÁÂÃÄÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝŸ';
    var accentConversion = 'AAAAAEEEEIIIINOOOOOUUUUYY';

    var letterOffset = 0;
    var word1 = word.toUpperCase();
    var word2 = translation.toUpperCase();
    var accentsIncorrect = [];
    // Loop through the longer of the two words...
    for (var i = 0; i < word2.length; i++) {
      // Check if the current letter is an accent character
      var accentIndex = accents.indexOf(word2[i]);
      // If the two letters are not a match...
      if(word1[i-letterOffset] !== word2[i]){
        // If the letter compared is not undefined and is a match for a non-accented character
        if(word1[i-letterOffset] !== undefined && word1[i-letterOffset] === accentConversion[accentIndex]){
          // Update the list of missing accents
          accentsIncorrect.push(accents[accentIndex]);
          // Log this letter as an accent error
          results.push({
            letter: word2[i],
            error: 'accent'
          });
        } else {
          // This wasn't a match, so we'll update position in case
          // it's just missing a single character
          letterOffset++;
          // Log this letter as missing
          results.push({
            letter: word2[i],
            error: 'missing'
          });
        }
      } else {
        // If the two characters match exactly, just log the letter
        results.push({
          letter: word2[i]
        });
      }
    };

    // Check if these two words are exactly the same
    var directComparison = word.toUpperCase() === translation.toUpperCase();
    // Check if the offset of missing characters was less than the allowed amount
    var offsetComparison = letterOffset < 2;

    // Decide correctness
    var correct = directComparison || offsetComparison;

    // Send back all the details
    onComplete(null, {
      word: word,
      translation: translation,
      correct: correct,
      accents: accentsIncorrect,
      breakdown: results
    });
  }

}