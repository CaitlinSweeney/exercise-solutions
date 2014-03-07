// #1
var letterCapitalize = function(s) {
  return s
  	.split(' ')
  	.map(function(word) { 
	  	return word[0].toUpperCase() + word.slice(1);
	  })
	  .join(' ');
}

// #2
var wordCount = function(s) {
  return s.split(' ').length;
};

// #3
var primeTime = function(n) {
	if(n < 4) {
		return true;
	}
	var number = n;
	for(var factor=2; factor<=number; factor++) {
		if(n % factor === 0) {
			return false;
		}
		else {
			number /= factor;
		}
	}
	return true;
};

primeTime(4);


module.exports = {
	letterCapitalize: letterCapitalize,
	wordCount: wordCount,
	primeTime: primeTime
};