console.log('BEGIN ASSERTIONS');

/** Returns true if the string is the same forwards as backwards, false otherwise. */
var palindrome = function(str) {
	for(var i=0; i<str.length/2; i++) {
		if(str[i] !== str[str.length-1-i]) {
			return false;
		}
	}
	return true;
}


console.assert( palindrome('bulldozer') === false, 'palindrome' );
console.assert( palindrome('racecar') === true, 'palindrome' );
console.assert( palindrome('noon') === true, 'palindrome' );
console.assert( palindrome('a') === true, 'palindrome' );
console.assert( palindrome('') === true, 'palindrome' );

/** Returns a string that represents the given number with dashes between each odd digit. */
var dashInsert = function(n) {
	var numStr = n.toString();
	var isOdd = function(d) { return d % 2 === 1; };

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

console.assert( dashInsert(454793) === "4547-9-3", 'dashInsert' );



// be clever
var dashInsert2 = function(n) {
	var digits = n.toString().split('');
	var isOdd = function(d) { return d % 2 === 1; };
	var zip = function(a,b) {
		return a.map(function(item, i) {
			return [item, b[i]];
		})
	};

	return zip(digits, digits.slice(1))
		.slice(0, -1)
		.map(function(pair) {
			return pair[0] + (pair.every(isOdd) ? '-' : '' ) + pair[1]
		})
		.reduce(function(x,y) {
			return x + y.substring(1);
		})
}

console.assert( dashInsert2(454793) === '4547-9-3', 'dashInsert2' );


var caesarCipher = function(str, n) {

	var isLetter = function(c) {
		var code = c.charCodeAt(0);
		return (code >= 65 && code <= 65+25) ||
			(code >= 97 && code <= 97+25);
	};

	var shift = function(c, n) {
		n = n % 26;
		var code = c.charCodeAt(0)+n;
		return String.fromCharCode(
			n > 0 && (code > 97+25 || (code > 65+25 && code < 97)) ? code-26 : 
			n < 0 && (code < 65 || (code < 97 && code > 65+25)) ? code+26 :
			code
		);
	}

	return str
		.split('')
		.map(function(c) {
			return isLetter(c) ? shift(c, n) : c;
		})
		.join('')
}

console.assert( caesarCipher('Caesar Cipher', 2) === 'Ecguct Ekrjgt', 'caesarCipher');
console.assert( caesarCipher('taz + TAZ', 1) === 'uba + UBA', 'caesarCipher');
console.assert( caesarCipher('taz + TAZ', 27) === 'uba + UBA', 'caesarCipher');
console.assert( caesarCipher('ma & PA', -1) === 'lz & OZ', 'caesarCipher');
