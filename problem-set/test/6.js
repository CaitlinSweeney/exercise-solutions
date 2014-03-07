var should = require('chai').should(),
	_6 = require('../6.js');

describe('bracketMatcher', function() {
  
  it('should return true for an empty string.', function() {
  	_6.bracketMatcher('').should.equal(true);
  });

  it('should handle even numbers of brackets', function() {
    _6.bracketMatcher('a(b(c(d)e)f)g').should.equal(true);
  });

  it('should return false if there\'s a missing closing bracket', function() {
    _6.bracketMatcher('((())').should.equal(false);
  });

  it('should return false if there\'s an extra closing bracket', function() {
    _6.bracketMatcher('(()))').should.equal(false);
  });

  it('should return true for multiple pairs', function() {
    _6.bracketMatcher('(()())').should.equal(true);
  })

  it('should return false for starting closing brackets', function() {
    _6.bracketMatcher(')(test)').should.equal(false);
  })

  it('should return false for ending opening brackets', function() {
    _6.bracketMatcher('(test)(').should.equal(false);
  })

  it('should work with intervening characters', function() {
    _6.bracketMatcher('(hello (world))').should.equal(true);
    _6.bracketMatcher('((hello (world))').should.equal(false);
  })

  // it('', function() {
  //   _6.bracketMatcher('(.());)()).').should.equal(false);
  // })

});

describe('withoutDuplicates', function() {

	it('should return an empty array unchanged', function() {
	  _6.withoutDuplicates([]).should.deep.equal([]);
	  _6.withoutDuplicates([2]).should.deep.equal([2]);
	  _6.withoutDuplicates([2, 3, 4, 4, 9]).should.deep.equal([2, 3, 4, 9]);
	});

});

describe('secondGreatLow', function() {

	it('should return the second greatest and second lowest numbers in an array', function() {
		_6.secondGreatLow([7, 7, 12, 98, 106]).should.equal('12 98');
	});

	it('should ignore duplicates', function() {
		_6.secondGreatLow([6, 3, 9, 2, 1]).should.equal('2 6');
	});

	it('should work on an array of 2 elements', function() {
		_6.secondGreatLow([6, 3]).should.equal('6 3');
	});

});

describe('timeConvert', function() {

	it('should return 0:0 for an input of 0', function() {
		_6.timeConvert(0).should.equal('0:0');
	});

	it('should return 0:0 for an input of 0', function() {
		_6.timeConvert(45).should.equal('0:45');
	});

	it('should return 0:0 for an input of 0', function() {
		_6.timeConvert(60).should.equal('1:0');
	});

	it('should return 0:0 for an input of 0', function() {
		_6.timeConvert(63).should.equal('1:3');
	});

	it('should return 0:0 for an input of 0', function() {
		_6.timeConvert(150).should.equal('2:30');
	});

})
