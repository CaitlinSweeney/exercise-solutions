describe('swapLetter', function() {

  it('should swap all instances of the first letter with the second in the given string', function() {
    expect( swapLetter('programming', 'r', 'g') )
    .toEqual( 'pgorgamminr' );
  });
});

describe('swapWord', function() {

  it('should swap the first word with the second in the given string', function() {
    expect( swapWord('Every day is a new day', 'day', 'new') )
    .toEqual( 'Every new is a day new' );
  });

  it('should work with different sized strings', function() {
    expect( swapWord('Wednesday is the new Friday', 'Wednesday', 'Friday') )
    .toEqual( 'Friday is the new Wednesday' );
  });

})

describe('trimRightMulti', function() {

  it('should remove whitespace at the end', function() {
    expect(trimRightMulti('hi   ')).toEqual('hi');
  });

  it('should not remove whitespace at the beginning', function() {
    expect(trimRightMulti('   hi   ')).toEqual('   hi');
  });

  it('should work with multiple lines', function() {
    expect(trimRightMulti('   hi   \n   there   \n!  ')).toEqual('   hi\n   there\n!');
  });

});