// This function is not yet implemented, and should initially make the tests fail.
// TODO: Make the tests pass!
/**
		@param arr 						An array
		@param start 					The index to start removing items
		@param numToReplace		The number of items to remove from the array
		@param ...						Items to insert
		@returns							A new array
*/
var splice = function(arr, start, numToReplace) {
	var i, output = [];
	for (i = 0; i < start && i < arr.length; i++) {
		output.push(arr[i]);
	}
	for (i = 3; i < arguments.length; i++) {
		output.push(arguments[i]);
	}
	for (i = start+numToReplace; i < arr.length; i++) {
		output.push(arr[i]);
	};
	return output;
};

/*
// splice in one line
var splice = function(arr, start, numToReplace) {

	return [].concat(arr.slice(0,start), Array.prototype.slice.apply(arguments, [3]), arr.slice(start+numToReplace));
};
*/


// The Smallest Unit Testing Library
var assert = function(a,b) {
if(a !== b) {
    console.error('Expected', a, 'to equal', b);
  }
   else {
    console.log('Test passed!', a, 'equals', b);
  }
};

// The Second Smallest Unit Testing Library... to support array comparison
// Prints FAIL if the two given arrays do not have the same contents.
var assertArraysEqual = function(a,b) {

	if(!a || a.length === undefined) {
		console.error('FAIL: Expected first argument to assertArraysEqual to be an array. Instead received:', a);
	}
	else if(!b || b.length === undefined) {
		console.error('FAIL: Expected second argument to assertArraysEqual to be an array. Instead received:', b);
	}
	else if(a.length !== b.length) {
		console.error('FAIL: Array', a, '(length: ' + a.length + 
			') expected to be the same length as', b, '(length: ' + b.length + ')');
	}
	else {
		var pass = true;
		for(var i=0; i<a.length; i++) {
			if(a[i] !== b[i]) {
				pass = false;
				break;
			}
		}
		if(pass) {
			console.log('PASS:', a, 'equals', b);
		}
		else {
			console.error('FAIL: Expected array', a, 'to equal', b);
		}
	}
};



// TESTS (Normally you'd have to write these yourself! But a magical elf left these for you...)

// You should be able to remove elements from an array.
assertArraysEqual(splice(['a','b','c','d','e'], 2, 2),  ['a','b','e']);

// The original array should remain unchanged (pure function).
var a = ['a','b','c','d','e'];
splice(a, 2, 2);
assertArraysEqual(a,  ['a','b','c','d','e']);

// You can insert an item with the fourth argument.
assertArraysEqual(splice(['a','b','c','d','e'], 1, 2, 'z'),  ['a','z','d','e']);

// You can insert elements without removing anything.
assertArraysEqual(splice(['a','b','c','d','e'], 1, 0, 'z'),  ['a','z','b','c','d','e']);

// Inserting at an arbitrarily high index should just insert at the end.
assertArraysEqual(splice(['a','b','c'], 99, 0, 'z'),  ['a','b','c','z']);
assertArraysEqual(splice(['a','b','c'], 99, 1, 'z'),  ['a','b','c','z']);

// You should be able to insert an arbitrary number of values using multiple arguments.
assertArraysEqual(splice(['a','b','c'], 99, 1, 'x','y','z'),  ['a','b','c','x','y','z']);

