// Supplant from Crockford's Remedial Javascript
// http://javascript.crockford.com/remedial.html
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

/* Rounds a number to the given decimel place. */
var roundToPlace = function(n, place) {
	place = place || 0;
	var multiplier = Math.pow(10, place);
	return Math.round(n * multiplier) / multiplier;
};

/* Converts a number of milliseconds to a readable string in seconds. */
var formatTimeSpan = function(t) {
	var seconds = t/1000;
	return seconds + " seconds";
};

/** Converts an object into a readable string. */
var formatObj = function(o, valueFormatter) {
	valueFormatter = valueFormatter || function(x) { return x; };
	var s = "";
	for(var key in o) {
		s += "  {0}: {1}\n".supplant([key, valueFormatter(o[key])]);
	}
	return s;
};

/** Same as above. */
/*var formatObj2 = function(o, valueFormatter) {
	var s = "";
	for(var key in o) {
		if(valueFormatter === undefined) {
			s += "  {0}: {1}\n".supplant([key, o[key]]);
		}
		else {
			s += "  {0}: {1}\n".supplant([key, valueFormatter(o[key])]);
		}
	}
	return s;
};
*/

/** Returns the element closest to the given y offset. */
var getClosestTo = function(els, y) {
	var closest;
	var closestDist = Infinity;

	els.each(function() {
		var dist = Math.abs($(this).offset().top - y);
		if(dist < closestDist) {
			closest = $(this);
			closestDist = dist;
		}
	});

	return closest;
};