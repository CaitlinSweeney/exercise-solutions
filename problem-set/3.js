/** Returns true if the string is the same forwards as backwards, false otherwise. */
var palindrome = function(str) {
	for(var i=0; i<str.length/2; i++) {
		if(str[i] !== str[str.length-1-i]) {
			return false;
		}
	}
	return true;
}

console.log('TESTS (should all return true):');

console.log('palindrome');
console.log( palindrome('bulldozer') === false, 'not a palindrome' );
console.log( palindrome('racecar') === true, 'odd number of letters' );
console.log( palindrome('noon') === true, 'even number of letters' );
console.log( palindrome('a') === true, 'single letter' );
console.log( palindrome('') === true, 'empty string' );

/** Returns a string that represents the given number with dashes between each odd digit. */
var dashInsert = function(n) {
	var numStr = n.toString();
	var isOdd = function(d) { return +(d) % 2 === 1; };

	// initialize the output with the first digit
	var output = numStr[0];

	// initialize oddDigitFound with whether the first digit is odd
	var oddDigitFound = isOdd(numStr[0]);

	for(var i=1; i<numStr.length; i++) {
		// check if the current digit is odd
		if(isOdd(numStr[i])) {

			// if the last digit was odd, insert a dash before the current digit
			if(oddDigitFound) {
				output += '-';
			}
			// otherwise, set oddDigitFound in case the next digit is odd
			else {
				oddDigitFound = true;
			}
		}
		// if it's not, reset the oddDigitFound flag to false
		else {
			oddDigitFound = false;
		}

		// add the current digit to the output string
		output += numStr[i];
	}

	return output;
}

console.log('dashInsert');
console.log( dashInsert(454793) === "4547-9-3", 'dashes between odd digits' );


