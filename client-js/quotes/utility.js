/** Returns a new array that only includes elements that pass the given evaluator function. */
var filter = function(arr, f) {
	var output = [];
	for(var i=0; i<arr.length; i++) {
		if(f(arr[i])) {
			output.push(arr[i]);
		}
	}
	return output;
};

/** A comparison function that can be used in Array.prototype.sort. Sorts objects by rating, high to low. */
var compareByReverseRating = function(a,b) {
	return a.rating < b.rating ? 1 :
				 a.rating > b.rating ? -1 :
				 0;
};

/** Performs string interpolation. */
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