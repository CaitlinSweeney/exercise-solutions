// SOLUTION 1
/** Breaks up the array into n segments. */
Array.prototype.chunk = function(n) {
	var output = [];
	var len = this.length;
	var size = Math.ceil(len/n);
	var rem = len % n;

	for(var i=0; i<n; i++) {
		var offset = i >= rem ? rem : 0;
		if(rem > 0 && i == rem) {
			size--;
		}
		output[i] = this.slice(i * size + offset, i * size + size + offset);
	}

	return output;
}
console.log([1,2,3,4,5,6,7,8,9,10].chunk(7))
console.log([1,2,3,4,5,6,7,8,9,10].chunk(3))
console.log([1,2,3,4,5,6,7,8,9,10].chunk(2))


// SOLUTION 2
/** Breaks up the array into n segments. */
Array.prototype.chunk = function(n) {
	var output = [];
	var len = this.length;
	var size = Math.floor(len/n);
	var rem = len % n;

	if(rem > 0) {
		for(var i=0; i<rem; i++) {
			output[i] = this.slice((size+1) * i, (size+1) * (i+1));
		}
	}

	for(var i=rem; i<n; i++) {
		output[i] = this.slice(size * i + rem, size * (i+1) + rem);
	}

	return output;
}
console.log([1,2,3,4,5,6,7,8,9,10].chunk(7))
console.log([1,2,3,4,5,6,7,8,9,10].chunk(3))
console.log([1,2,3,4,5,6,7,8,9,10].chunk(2))



// SOLUTION 3
/** Breaks up the array into n segments. */
Array.prototype.chunk = function(n) {
	var output = [];
	var len = this.length;
	var size = Math.floor(len/n);
	var rem = len % n;

	for(var i=0; i<n; i++) {
		var start = size * i + rem;
		var end = start + size;
		if(rem > 0 && i < rem) {
			start += i - rem;
			end = start + size + 1;
		}
		output[i] = this.slice(start, end);
	}

	return output;
}
console.log([1,2,3,4,5,6,7,8,9,10].chunk(7))
console.log([1,2,3,4,5,6,7,8,9,10].chunk(3))
console.log([1,2,3,4,5,6,7,8,9,10].chunk(2))




/** Breaks up the array into n segments. */
Array.prototype.chunk = function(n) {
	var output = [];
	var len = this.length;
	var bigSize = Math.ceil(len/n);
	var smallSize = bigSize - 1;
	var rem = len % n;

	var size = bigSize;
	for(var i=0; i<len; i+=size) {
		if(rem > 0 && i >= rem * bigSize) {
			size = smallSize
		}
		output.push(this.slice(i, i+size));
	}

	return output;
}
console.log([1,2,3,4,5,6,7,8,9,10].chunk(7))
console.log([1,2,3,4,5,6,7,8,9,10].chunk(3))
console.log([1,2,3,4,5,6,7,8,9,10].chunk(2))


/** The most elegant solution of all.
		From: http://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays/8189268#8189268
*/
Array.prototype.chunk(n) {
    var len = this.length,out = [], i = 0;
    while (i < len) {
        var size = Math.ceil((len - i) / n--);
        out.push(this.slice(i, i += size));
    }
    return out;
}
