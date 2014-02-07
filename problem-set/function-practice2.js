console.log('Test Runner - If no errors, all asserts passed.');

// HELPERS ///////////

/** Returns the number of key-value pairs in an object. */
var objLength = function(o) {
	var count = 0;
	for(var key in o) {
		count++;
	}
	return count;
};

console.assert(objLength({}) === 0);
console.assert(objLength({ a: 10, b: 20, c: 30 }) === 3);

/** Returns true if the two given objects have equal items. */
var deepEqual = function(a, b) {
	var count = 0;
	for(var key in a) {
		count++;
		if(!(key in b) || a[key] !== b[key]) {
			return false;
		}
	}
	return objLength(b) === count;
};

console.assert(deepEqual({}, {}) === true, 'deepEqual');
console.assert(deepEqual({ a: 10 }, { a: 10 }) === true, 'deepEqual');
console.assert(deepEqual({ a: 10 }, { a: 20 }) === false, 'deepEqual');
console.assert(deepEqual({ a: 10 }, { a: 10, b: 10 }) === false, 'deepEqual');
console.assert(deepEqual({ a: 10, b: 10 }, { a: 10 }) === false, 'deepEqual');


// UNIT TESTS ///////////

/** Returns the name property of the given object. */
var getName = function(o) {
	return o.name;
};

console.assert(getName({ name: 'Luisa', age: 25 }) === 'Luisa', 'getName');

/** Returns the total number of letters in the given array of strings. */
var totalLetters = function(words) {
	return words.join('').length;
};

// an alternate implementation
var totalLetters2 = function(words) {
	var count = 0;
	for(var i=0; i<words.length; i++) {
		count += words[i].length;
	}
	return count;
}

console.assert(totalLetters(['javascript', 'is', 'awesome']) === 19, 'totalLetters')
console.assert(totalLetters(['what', 'happened', 'to', 'my', 'function']) === 24, 'totalLetters');
console.assert(totalLetters2(['javascript', 'is', 'awesome']) === 19, 'totalLetters2')
console.assert(totalLetters2(['what', 'happened', 'to', 'my', 'function']) === 24, 'totalLetters2');

/** Returns an object with a single key-value pair specified as key and value arguments. */
var keyValue = function(key, value) {
	var o = {};
	o[key] = value;
	return o;
};

console.assert(deepEqual(keyValue('city', 'Denver'), { city: 'Denver' }), 'keyValue')

/** Returns the value at the given negative index (arr.length+index). */
var negativeIndex = function(arr, i) {
	return arr[arr.length+i];
};

console.assert(negativeIndex(['a', 'b', 'c', 'd', 'e'], -2) === 'd', 'negativeIndex');
console.assert(negativeIndex(['jerry', 'sarah', 'sally'], -1) === 'sally', 'negativeIndex');

/* Prints all the key-value pairs in the given object. */
var printObject = function(o) {
	for(var key in o) {
		console.log(key + ' is ' + o[key]);
	}
}

// NO UNIT TESTS for printObject

/** Removes all instances of 'm' in the given string. */
var removeM = function(str) {
	var output = '';
	for(var i=0; i<str.length; i++) {
		if(str[i] != 'm') {
			output += str[i];
		}
	}
	return output;
}

console.assert(removeM('family') === 'faily', 'removeM');
console.assert(removeM('memory') === 'eory', 'removeM');

/** Returns an array of all the vowels (including duplicates) in the given string. */
var vowels = function(str) {
	var output = [];
	var vowelMap = {
		'a': true,
		'e': true,
		'i': true,
		'o': true,
		'u': true
	};
	for(var i=0; i<str.length; i++) {
		if(str[i] in vowelMap) {
			output.push(str[i]);
		}
	}
	return output;
}

// another version
var vowels2 = function(str) {
	var output = [];
	for(var i=0; i<str.length; i++) {
		if(str[i] === 'a' || str[i] === 'e' || str[i] === 'i' || str[i] === 'o' || str[i] === 'u') {
			output.push(str[i]);
		}
	}
	return output;
};

console.assert(deepEqual(vowels('alabama'), ['a', 'a', 'a', 'a']), 'vowels');
console.assert(deepEqual(vowels('What lets in youth?'), ['a', 'e', 'i', 'o', 'u']), 'vowels');
console.assert(deepEqual(vowels2('alabama'), ['a', 'a', 'a', 'a']), 'vowels2');
console.assert(deepEqual(vowels2('What lets in youth?'), ['a', 'e', 'i', 'o', 'u']), 'vowels2');

/** Returns true if each pair of items in the given array are equal. Arrays with an odd length always return false. */
var twins = function(arr) {
	if(arr.length % 2 === 1) {
		return false;
	}
	for(var i=0; i<arr.length; i+=2) {
		if(arr[i] !== arr[i+1]) {
			return false;
		}
	}
	return true;
};

console.assert(twins(['a', 'a', 'b', 'b', 'c', 'c']) === true);
console.assert(twins(['a', 'a', 'b', 'z']) === false);
console.assert(twins(['a', 'a', 'b']) === false);
console.assert(twins(['a', 'a', undefined]) === false);

/** Returns true if any one of the booleans in the given array are true. Returns false for an empty array. */
var or = function(arr) {
	for(var i=0; i<arr.length; i++) {
		if(arr[i]) {
			return true;
		}
	}
	return false;
}

console.assert(or([false, false, true, false]) === true, 'or');
console.assert(or([false, false, false]) === false, 'or');
console.assert(or([]) === false, 'or');

/** Returns a new array consisting of the unique values from the given array. */
var unique = function(arr) {
	var hash = {};
	var output = [];

	// add the values to the hash dictionary.
	for(var i=0; i<arr.length; i++) {
		hash[arr[i]] = true;
	}

	// pull off the keys
	for(var key in hash) {
		output.push(key);
	}

	return output;
}

console.assert(deepEqual(unique(['a', 'b', 'a', 'c', 'd', 'd']), ['a', 'b', 'c', 'd']), 'unique');
console.assert(deepEqual(unique(['todd', 'avery', 'maria', 'avery']), ['todd', 'avery', 'maria']), 'unique');



