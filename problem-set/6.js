// #1

/** Removes duplicates from a sorted array. */
var withoutDuplicates = function(arr) {
	var out = [];
	for(var i=0; i<arr.length; i++) {
		if(i === 0 || arr[i] !== arr[i-1]) {
			out.push(arr[i]);
		}
	}
	return out;
};

/** Returns the second lowest and second greatest numbers in an array. */
var secondGreatLow = function(numbers) {
  var arr = withoutDuplicates(numbers);
  arr.sort(function(a,b) { return a-b; });
  return arr[1] + ' ' + arr[arr.length-2];
};

// #2

var timeConvert = function(num) {
	var hours = Math.floor(num/60);
	var minutes = num % 60;
	return hours + ':' + minutes;
};

// #3

// readable version
var bracketMatcher = function(s) {
	var close = s.indexOf(')');
  var open = s.lastIndexOf('(', close);
  var stringWithOnePairRemoved = s.substring(0, open) + s.substring(close+1);

  var nobrackets = open === -1 && close === -1;
  var onebracket = open === -1 ^ close === -1;

  return nobrackets ? true :
  	onebracket ? false :
  	bracketMatcher(stringWithOnePairRemoved);
};

// crazy version
// var bracketMatcher = function(s) {
// 	var close = s.indexOf(')');
//   var open = s.lastIndexOf('(', close);

//   return !~open && !~close || 
//   	!!~open && !!~close && 
//   	bracketMatcher(s.substring(0, open) + s.substring(close+1));
// };

module.exports = {
	withoutDuplicates: withoutDuplicates,
	secondGreatLow: secondGreatLow,
	timeConvert: timeConvert,
	bracketMatcher: bracketMatcher
};
