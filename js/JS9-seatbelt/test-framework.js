/*****************************************
 * A Tiny Unit Testing Library
 *****************************************/

var assert = function(a,b) {
	if(a !== b) {
    console.error('FAIL: Expected', a, 'to equal', b);
  }
  else {
    console.log('PASS:', a, 'equals', b);
  }
};