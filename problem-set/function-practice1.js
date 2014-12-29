// 1.
var tripleFive = function() {
	for(var i=0; i<3; i++) {
		console.log('Five!');
	}
};

// 2.
var lastLetter = function(str) {
	return str[str.length-1];
};

console.log( lastLetter('hello') === 'o', 'lastLetter' );
console.log( lastLetter('island') === 'd', 'lastLetter' );

// 3.
var square = function(number) {
	return number * number;
};

console.log( square(3) === 9, 'square' );
console.log( square(5) === 25, 'square' );

// 4.
var negate = function(number) {
	return -number;
};

console.log( negate(5) === -5, 'negate' );
console.log( negate(-8) === 8, 'negate' );

// 5.
var toArray = function(a, b, c) {
	return [a, b, c];
};


// 6.
var startsWithA = function(str) {
	return str[0] === 'A';
};

console.log( startsWithA('Aardvark') === true, 'startsWithA' );
console.log( startsWithA('Bear') === false, 'startsWithA' );

// 7.
var excite = function(str) {
	return str + '!!!';
};

console.log( excite('yes') === 'yes!!!', 'excite' );
console.log( excite('go') === 'go!!!', 'excite' );

// 8.
var sun = function(str) {
	return str.indexOf('sun') >= 0;
};

console.log( sun('sundries') === true, 'sun' );
console.log( sun('asunder') === true, 'sun' );
console.log( sun('catapult') === false, 'sun' );

// 9.
var tiny = function(number) {
	return number > 0 && number < 1;
};

console.log( tiny(0.3) === true, 'tiny' );
console.log( tiny(14) === false, 'tiny' );
console.log( tiny(-5) === false, 'tiny' );

// 10.
var getSeconds = function(timespan) {
	var minutesString = timespan.substring(0,2);
	var secondsString = timespan.substring(3, 2);
	var minutes = parseInt(minutesString);
	var seconds = parseInt(secondsString);
	return minutes * 60 + seconds;
}

console.log( getSeconds('01:30') === 90, 'getSecondsgetSeconds' );
console.log( getSeconds('10:25') === 625, 'getSeconds' );
