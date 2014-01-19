describe('splice', function() {
  it('should remove the correct number of items from the given start position', function() {
    expect(splice(['a','b','c','d','e'], 1, 1)).toEqual(['a','c','d', 'e']);
    expect(splice(['a','b','c','d','e'], 2, 2)).toEqual(['a','b','e']);
  });

  it('should not change the original array', function () {
		var a = ['a','b','c','d','e'];
		splice(a, 2, 2);
  	expect(a).toEqual(['a','b','c','d','e']);
  });

  it('should insert at the start index', function () {
  	expect(splice(['a','b','c','d','e'], 1, 2, 'z')).toEqual(['a','z','d','e']);
  });

  it('should be able to insert elements without removing any', function () {
  	expect(splice(['a','b','c','d','e'], 1, 0, 'z')).toEqual(['a','z','b','c','d','e']);
  });

  it('should insert at the end if the start index is beyond the length of the array', function() {
  	expect(splice(['a','b','c'], 99, 0, 'z')).toEqual(['a','b','c','z']);
  	expect(splice(['a','b','c'], 99, 5, 'z')).toEqual(['a','b','c','z']);
  });

  it('should insert any number of items, given as the 3rd, 4th, 5th arguments, etc', function() {
  	expect(splice(['a','b','c'], 99, 1, 'x','y','z')).toEqual(['a','b','c','x','y','z']);
  });
});