var should = require('chai').should(),
	_1 = require('../1.js');

describe('letterCapitalize', function() {
	it('should capitalize the first letter of each word in a string', function() {
		_1.letterCapitalize('this sentence is NICE').should.equal('This Sentence Is NICE');
	});
});

describe('wordCount', function() {
	it('should count the number of words in a sentence', function() {
		_1.wordCount('How many words?').should.equal(3);
	});
});

describe('primeTime', function() {
	it('should return true for 1', function() {
		_1.primeTime(1).should.equal(true);
	});
	it('should return true for 2', function() {
		_1.primeTime(2).should.equal(true);
	});
	it('should return true for 3', function() {
		_1.primeTime(3).should.equal(true);
	});
	it('should return false for 4', function() {
		_1.primeTime(4).should.equal(false);
	});
	it('should return true for 5', function() {
		_1.primeTime(5).should.equal(true);
	});
	it('should return false for 6', function() {
		_1.primeTime(6).should.equal(false);
	});
	it('should return true for 7', function() {
		_1.primeTime(7).should.equal(true);
	});
	it('should return false for 8', function() {
		_1.primeTime(8).should.equal(false);
	});
	it('should return false for 9', function() {
		_1.primeTime(9).should.equal(false);
	});
	it('should return false for 10', function() {
		_1.primeTime(10).should.equal(false);
	});
	it('should return true for 11', function() {
		_1.primeTime(11).should.equal(true);
	});
	it('should handle numbers up to 2^16', function() {
	  true.should.equal(false);
	});
});