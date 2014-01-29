// UTILITY

function map(items, f) {
	var output = [];
	for(var i=0, len=items.length; i<len; i++) {
		output.push(f(items[i]));
	}
	return output;
}

function filter(items, f) {
	var output = [];
	for(var i=0, len=items.length; i<len; i++) {
		if(f(items[i])) {
			output.push(items[i]);
		}
	}
	return output;
}

// SOLUTIONS

/** Returns a string in reverse order. */
var firstReverse  = function(str) {
	var rev = '';
	for(var i=0; i<str.length; i++) {
		rev = str[i] + rev;
	}
	return rev;
};

/** Swaps the case of every letter in a string. */
var swapCase = function(str) {

	/** Changes the case of the given letter, or ignores it if whitespace or punctuation. */
	var changeCase = function(letter) {
		var upper = letter.toUpperCase();
		return letter === upper ? letter.toLowerCase() : upper;
	}

	return map(str, changeCase).join('');
};

/** Returns the first word with the greatest number of repeated letters in a sentence. Returns -1 if no word has repeated letters. */
var letterCount = function(str) {

	/** Gets an array of values in an object. */
	var values = function(obj) {
		var vals = [];
		for(var key in obj) {
			vals.push(obj[key]);
		}
		return vals;
	};

	/** Counts the number of occurrences of each item in an array. Returns an object with keys equal to unique array items and values equal to their counts. Stringified array items must be 1:1 with array values. */
	var tally = function(arr) {
		var countObj = {};
		for(var i=0; i<arr.length; i++) {
			var item = arr[i];
			if(!(item in countObj)) {
				countObj[item] = 0;
			}
			countObj[item]++;
		}
		return countObj;
	};

	/** Returns the geratest number of repeated letters in the given word. */
	var mostRepeated = function(word) {
		var counts = values(tally(word));
		return Math.max.apply(null, counts);
	}

	var words = str.split(' ');
	var wordRepeatedCounts = map(words, mostRepeated);
	var maxRepeatCount = Math.max.apply(null, wordRepeatedCounts);
	var firstMaxIndex = wordRepeatedCounts.indexOf(maxRepeatCount);

	return maxRepeatCount > 1 ? words[firstMaxIndex] : -1;
};

// TESTS
console.log("TESTS (should all return true)");

// first reverse
console.log(firstReverse('refactoru') === 'urotcafer');

// swap case
console.log( swapCase('Hello World') === 'hELLO wORLD' );

// letter count
console.log(letterCount('Today is the greatest day ever') === 'greatest');
console.log(letterCount('Yesterday was neverending') === 'neverending');
console.log(letterCount('I am not ready for today') === -1);
