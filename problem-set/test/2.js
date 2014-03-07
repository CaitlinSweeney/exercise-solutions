var should = require('chai').should(),
	_2 = require('../2.js');

describe('firstReverse', function() {
  it('should reverse a string', function() {
  	_2.firstReverse('refactoru').should.equal('urotcafer');
  });
});

describe('swapCase', function() {
  it('should swap the case of each letter in a string', function() {
  	_2.swapCase('Hello World').should.equal('hELLO wORLD');
  });
});

describe('letterCount', function() {
	it('should return the first word with the greatest number of repeated letters', function() {
		_2.letterCount('Today is the greatest day ever').should.equal('greatest');
		_2.letterCount('Yesterday was atrocious').should.equal('Yesterday');
	});
	it('should return -1 if no word have repeated letters', function() {
		_2.letterCount('I am not ready for today').should.equal(-1);
	});
});
