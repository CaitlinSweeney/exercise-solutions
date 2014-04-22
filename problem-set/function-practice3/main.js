var swapLetter = function(str, a, b) {
	var letters = str.split('');
	for(var i=0; i<letters.length; i++) {
		if(letters[i] === a) {
			letters[i] = b;
		}
		else if(letters[i] === b) {
			letters[i] = a;
		}
	}
	return letters.join('');
};

// use split and trimRight
var trimRightMulti = function(str) {
  return str.split('\n').map(function(line) {
    return line.trimRight();
  }).join('\n');
};