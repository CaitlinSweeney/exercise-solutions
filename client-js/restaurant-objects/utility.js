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

function map(arr, f) {
	var out = [];
	for(var i=0, len=arr.length; i<len; i++) {
		out.push(f(arr[i]));
	}
	return out;
}

function pluck(arr, prop) {
	var out = [];
	for(var i=0, len=arr.length; i<len; i++) {
		out.push(arr[i][prop]);
	}
	return out;
}