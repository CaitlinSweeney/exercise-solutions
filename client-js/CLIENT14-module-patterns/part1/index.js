var Repeater = {

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
	}
	
};