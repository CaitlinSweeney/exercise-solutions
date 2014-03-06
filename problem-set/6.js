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

// #1 TESTS

// withoutDuplicates
// console.log(withoutDuplicates([]), 'should equal', []);
// console.log(withoutDuplicates([2]), 'should equal', [ 2 ]);
// console.log(withoutDuplicates([2, 3, 4, 4, 9]), 'should equal', [ 2, 3, 4, 9 ]);

// secondGreatLow
// console.log(secondGreatLow([7, 7, 12, 98, 106]), 'should equal', '12 98');
// console.log(secondGreatLow([6, 3, 9, 2, 1]), 'should equal', '2 6');
// console.log(secondGreatLow([6, 3]), 'should equal', '6 3');


// #2

var timeConvert = function(num) {
	var hours = Math.floor(num/60);
	var minutes = num % 60;
	return hours + ':' + minutes;
};

// console.log(timeConvert(0), 'should equal', '0:0');
// console.log(timeConvert(45), 'should equal', '0:45');
// console.log(timeConvert(60), 'should equal', '1:0');
// console.log(timeConvert(63), 'should equal', '1:3');
// console.log(timeConvert(150), 'should equal', '2:30');

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
	secondGreatLow: secondGreatLow,
	timeConvert: timeConvert,
	bracketMatcher: bracketMatcher
};
