var Repeater = (function(){

	// private variables
	var count = 0;

	// return object
	return {
		/** Repeats a string n times. */
		repeatString: function repeatString(str, n) {
			var out = '';
			for(var i=0; i<n; i++) {
				out += str;
			}
			return out;
		},

		/** Calls a function n times. */
		repeatFunction: function repeatFunction(f, n) {
			for(var i=0; i<n; i++) {
				f()
			};
		},

		/** Repeats a string once then one additional time for each time this function has already been invoked. */
		repeatMore: function repeatMore(str) {
			count++;
			var out = '';
			for(var i=0; i<count; i++) {
				out += str;
			}
			return out;		}
	};

})();
