if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(
            /\{([^{}]*)\}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    };
}

/** Returns a new array containing the result of calling the given function on each item in the given array. */
function map(arr, f) {
	var out = [];
	for(var i=0, len=arr.length; i<len; i++) {
		out.push(f(arr[i]));
	}
	return out;
}

/** Returns a new array containing the value of the given property of each item in the array of objects. */
function pluck(arr, prop) {
	var out = [];
	for(var i=0, len=arr.length; i<len; i++) {
		out.push(arr[i][prop]);
	}
	return out;
}

/** Returns true if all the items in the given array are truthy. Returns true for []. */
var and = function(operands) {
	for(var i=0; i<operands.length; i++) {
		if(!operands[i]) {
			return false;
		}
	}
	return true;
}
