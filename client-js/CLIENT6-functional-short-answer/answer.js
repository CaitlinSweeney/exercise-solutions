// 1. Rewrite the pluralize function using the ternary operator:
var pluralize = function (word, number) {
	return number === 1 ? word : word + 's';
};

// 2. Rewrite the following code to be more functional
var getVictimInfo = function() {
	var v = {};

	v.name = prompt("Please enter your name:");
	v.phone = prompt("Please enter your phone number:");
	v.street = prompt("Please enter your street:");

	return v;
};

var victim = getVictimInfo();

alert('Thank you! Victim entered: \n' + 
 victim.name + ", " + 
 victim.phone + ", " + 
 victim.street);

// 3. Write a function which removes falsey values from an array.

// Impure
var arr = ['a', false, true, 1, 2, 3, NaN, undefined, null, 'end'];

function removeFalseyImpure() {

	// loop through each item in the array
	for(var i=0, len=arr.length; i<len; i++) {

		// check if the item is falsey
		if(!arr[i]) {

			// if so, remove it with slice
			arr.splice(i, 1);

			// compensate for modifying the array
			i--;
		}
	}

}

// Pure
var arr = ['a', false, true, 1, 2, 3, NaN, undefined, null, 'end'];

function removeFalseyPure() {

	// create an empty array to store the truthy values to return
	var output = [];

	// loop through each item in the array
	for(var i=0, len=arr.length; i<len; i++) {

		// check if the array item is truthy
		if(arr[i]) {

			// if so, push it to the output array
			output.push(arr[i]);
		}

		// else if it's falsey, don't do anything

	}

	// return the newly constructed array of truthy values
	return output;
}
