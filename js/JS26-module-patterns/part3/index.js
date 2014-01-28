var Repeater = (function(){

	// private variables
	var count = 0;

	/** Repeats a string n times. */
	var repeatString = function repeatString(str, n) {
		var out = '';
		for(var i=0; i<n; i++) {
			out += str;
		}
		return out;
	};

	/** Calls a function n times. */
	var repeatFunction = function repeatFunction(f, n) {
		for(var i=0; i<n; i++) {
			f()
		};
	};

	/** Repeats a string once then one additional time for each time this function has already been invoked. */
	var repeatMore = function repeatMore(str) {
		return repeatString(str, ++count);
	};

	/** Calls repeatFunction twice with the same arguments. */
	var repeatFunctionTwice = function repeatFunctionTwice(f, n) {
		repeatFunction(f, n);
		repeatFunction(f, n);
	};

	// return the public interface
	return {
		repeatString: 				repeatString,
		repeatFunction: 			repeatFunction,
		repeatMore: 					repeatMore,
		repeatFunctionTwice: 	repeatFunctionTwice
	};

})();
