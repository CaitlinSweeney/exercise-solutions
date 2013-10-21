var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
	var data = fs.readFileSync('data.txt');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(data);
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');