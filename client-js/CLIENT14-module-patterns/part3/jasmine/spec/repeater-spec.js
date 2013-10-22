describe('repeatString', function() {
  it('should return a string repeated n times', function() {
    expect(Repeater.repeatString('cat', 3)).toEqual('catcatcat');
  });
});

describe('repeatFunction', function() {
  it('should call a function n times', function() {
    var str = 'oh';
    var write = function() { str += 'hi'; };
    Repeater.repeatFunction(write, 3);
    expect(str).toEqual('ohhihihi');
  });
});

describe('repeatMore', function() {
  it('should repeat a string once, twice, etc for each time the function has been invoked', function(){
    expect(Repeater.repeatMore('cat')).toEqual('cat');
    expect(Repeater.repeatMore('dog')).toEqual('dogdog');
    expect(Repeater.repeatMore('bat')).toEqual('batbatbat');
    expect(Repeater.repeatMore('lion')).toEqual('lionlionlionlion');
    expect(Repeater.repeatMore('lemur')).toEqual('lemurlemurlemurlemurlemur');
  });
  it('should not expose a public count variable', function(){
    expect(typeof count).toBe('undefined');
  });
});

describe('repeatFunctionTwice', function() {
  it('should call a function n times, twice', function() {
    var str = 'oh';
    var write = function() { str += 'hi'; };
    Repeater.repeatFunctionTwice(write, 2);
    expect(str).toEqual('ohhihihihi');
  });
});
