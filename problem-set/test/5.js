var should = require('chai').should(),
	_5 = require('../5.js');

describe('alphabetSoup', function() {
	it('should return empty strings as-is', function() {
		_5.alphabetSoup('').should.equal('');
	});
	it('should return a string with letters in alphabetical order', function() {
		_5.alphabetSoup('hello').should.equal('ehllo');
	});
});

describe('vowelCount', function() {
	it('should return the number of vowels in a string', function() {
		_5.vowelCount('All cows eat grass').should.equal(5);
	});
});

describe('coinDeterminer', function() {
  it('should determine the fewest number of coins needed to add to a sum', function() {
  	_5.coinDeterminer(16, [11, 9, 7, 5, 1]).should.equal(2);
  	_5.coinDeterminer(25, [11, 9, 7, 5, 1]).should.equal(3);
  	_5.coinDeterminer(12, [5, 4, 1]).should.equal(3);
  	_5.coinDeterminer(79, [1, 5, 7, 13]).should.equal(7);
  	_5.coinDeterminer(80, [1, 5, 7, 13]).should.equal(8);
  	_5.coinDeterminer(81, [1, 5, 7, 13]).should.equal(9);
  	_5.coinDeterminer(82, [1, 5, 7, 13]).should.equal(8);
  	_5.coinDeterminer(83, [1, 5, 7, 13]).should.equal(7);
  	// infinite loop!
  	// _5.coinDeterminer(100, [1, 5, 7, 13]).should.equal('?');
  });
});
