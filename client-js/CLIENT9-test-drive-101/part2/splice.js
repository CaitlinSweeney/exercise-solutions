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
