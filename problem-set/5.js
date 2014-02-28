var recursive;

var coinDeterminer = function(n, coins) {

	var queue = [{ n: n, c: 0}];

	var process = function() {
		recursive++;
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

// TESTS ///////////////////////////////////////////////

// recursive = 0;
// console.log('TEST: ', coinDeterminer(16, [11, 9, 7, 5, 1]), 2);
// console.log(recursive);

// recursive = 0;
// console.log('TEST: ', coinDeterminer(25, [11, 9, 7, 5, 1]), 3);
// console.log(recursive);

// recursive = 0;
// console.log('TEST: ', coinDeterminer(12, [5, 4, 1]), 3);
// console.log(recursive);

// recursive = 0;
console.log('TEST: ', coinDeterminer(79, [1, 5, 7, 13]), 7);
// console.log(recursive);


