var should = require('chai').should(),
	_6 = require('./6.js');

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

});
