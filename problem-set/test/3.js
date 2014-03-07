var should = require('chai').should(),
	_3 = require('../3.js');

describe('palindrome', function() {
  it('should return true if the word is the same backwards as forwards', function() {
  	_3.palindrome('racecar').should.equal(true);
  	_3.palindrome('noon').should.equal(true);
  });
  it('should return false if the word is not the same backwards as forwards', function() {
  	_3.palindrome('bulldozer').should.equal(false);
  });
  it('should return true for a single letter', function() {
  	_3.palindrome('a').should.equal(true);
  });
  it('should return true for an empty string', function() {
  	_3.palindrome('').should.equal(true);
  });
});

describe('dashInsert', function() {
	it('should insert dashes between odd digits', function() {
		_3.dashInsert(454793).should.equal('4547-9-3');
	});
});

describe('dashInsert2', function() {
	it('should insert dashes between odd digits', function() {
		_3.dashInsert2(454793).should.equal('4547-9-3');
	});
});

describe('caesarCipher', function() {
	it('should shift letters', function() {
		_3.caesarCipher('Caesar Cipher', 2).should.equal('Ecguct Ekrjgt');
	});
	it('should wrap z to a', function() {
		_3.caesarCipher('taz TAZ', 1).should.equal('uba UBA');
	});
	it('should wrap correctly with shifts greater than 26', function() {
		_3.caesarCipher('taz TAZ', 27).should.equal('uba UBA');
	});
	it('should ignore non-letters', function() {
		_3.caesarCipher('taz + TAZ', 1).should.equal('uba + UBA');
	});
	it('should shift left with a negative number', function() {
		_3.caesarCipher('ma & PA', -1).should.equal('lz & OZ');
	});
});
