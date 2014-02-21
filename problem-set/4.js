var assert = require('better-assert');

/** Returns true if the given string is a number. */
var isNumber = function(s) {
  return !isNaN(parseFloat(s)) && isFinite(s);
};

/** Searches for all the numbers in a string and adds them together. */
var numberSearch = function(str) {
	var groups = [];
	var currentGroup = '';

	/** Helper function to push the currentGroup onto the groups array. */
	var pushCurrent = function() {
	  if(currentGroup.length) {
	  	groups.push(currentGroup);
	  }
	};

	// loop through each character, determine if its a number, and group adjacent numbers for adding
  for(var i=0, len=str.length; i<len; i++) {
  	if(isNumber(str[i])) {
  		currentGroup += str[i];
  	}
  	else {
		  pushCurrent();
		  currentGroup = '';
  	}
  }
  pushCurrent();

  // parse each number group and sum
  return groups
  	.map(function(str) { return parseFloat(str); })
  	.reduce(function(x,y) { return x+y; });
};

/** Return the longest word in the string. Returns the first of there's a tie. */
var longestWord = function(str) {
	var words = str.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, '').split(' ');
	var lengths = words.map(function(w) { return w.length; });
	var maxLength = Math.max.apply(Math, lengths);
  return words[lengths.indexOf(maxLength)];
};


var numberSearch2 = function(str) {
	var sum = str
		.split('')
		.filter(function(c) { return isNumber(c); })
		.map(function(c) { return parseInt(c); })
		.reduce(function(x,y) { return x+y; });
	var letters = str.replace(/[^a-zA-Z]/g, '');
  return Math.round(sum/letters.length);
};


// UNIT TESTS ///////////////////////////////////////////////

assert(numberSearch('88Hello 3Word') === 91);
assert(numberSearch('55Hello') === 55);
assert(numberSearch('5Hello 5') === 10);

assert(longestWord('This is a stickup') === 'stickup');
assert(longestWord('What would Ferdinand do?') === 'Ferdinand');
assert(longestWord('Race fast.') === 'Race', 'should ignore punctuation');
assert(longestWord('If only four were one.') === 'only', 'if tie, first longest word should be returned');

assert(numberSearch2('Hello6 9World 2, Nic8e D7ay!') === 2);
