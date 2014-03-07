// #1
var alphabetSoup = function(s) {
  return s.split('').sort().join('');
};

// #2
var vowelCount = function(s) {
	var reg = /[aeiouAEIOU]/;
	var isVowel = reg.test.bind(reg);
  return s.split('').filter(isVowel).length;
};

// #3
var coinDeterminer = function(n, coins) {

	var queue = [{ n: n, c: 0}];

	var process = function() {
		var node = queue.shift();
		// console.log(node)
		// console.log('\n');
		var fitCoins = coins.filter(function(coin) {
		  return coin <= node.n;
		});
		// console.log('fitCoins', fitCoins.length);

		for(var i=0; i<fitCoins.length; i++) {
			var remaining = node.n - fitCoins[i];
			// console.log(node.n, fitCoins[i], remaining);
			if(remaining === 0) {
				return node.c + 1;
			}
			else {
				queue.push({ 
					n: remaining, 
					c: node.c + 1
					// coins: [].concat(node.coins, fitCoins[i])
				});
			}
		}
	};

	while(queue.length) {
		var count = process();
		// console.log('process:', count);
		if(count) {
			return count;
		}
	}
}

module.exports = {
	alphabetSoup: alphabetSoup,
	vowelCount: vowelCount,
	coinDeterminer: coinDeterminer
};
