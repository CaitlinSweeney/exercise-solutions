var should = require('chai').should(),
	_4 = require('../4.js');

describe('addNumbers', function() {
  it('should add all the numbers in a string', function() {
  	_4.addNumbers('Hello 2 th3 Word').should.equal(5);
  });
  it('should treat multiple contiguous digits as a single number', function() {
  	_4.addNumbers('88Hello 3Word').should.equal(91);
  });
});

describe('longestWord', function() {
	it('should find the longest word in a string', function() {
		_4.longestWord('This is a stickup').should.equal('stickup');
	});
	it('should ignore punctuation', function() {
		_4.longestWord('Race fast.').should.equal('Race');
	});
	it('should return the first longest word of there\'s a tie', function() {
		_4.longestWord('If only four were one.').should.equal('only');
	});
	it('should treat words separated by non-whitespace punctuation as separate words', function() {
		_4.longestWord('en-us lang').should.equal('lang');
	});
});

describe('averageStringNumbers', function() {
	it('should return the average of all numbers in a string', function() {
		_4.averageStringNumbers('Hello6 9World 2, Nic8e D7ay!').should.equal(2);
	});
});
