
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var data = {
	"programming" : {
		"Python" : {
			"desc" : "a high-level general-purpose programming language."
		},
		"Ruby" : {
			"desc" : "Ruby is a dynamic, reflective, object-oriented, general-purpose programming language. It was designed and developed in the mid-1990s by Yukihiro Matz Matsumoto in Japan."
		},
		"C" : {
			"desc" : "In computing, C (as in the letter C) is a general-purpose programming language initially developed by Dennis Ritchie between 1969 and 1973 at AT&T Bell Labs"
		},
		"Go" : {
			"desc" : "Go, also called golang, is a programming language initially developed at Google[6] in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson.[2] It is a statically-typed language with syntax loosely derived from that of C, adding automatic memory management, type safety, some dynamic-typing capabilities, additional built-in types such as variable-length arrays and key-value maps, and a large standard library."
		},
		"PHP" : {
			"desc" : "PHP is a server-side scripting language designed for web development but also used as a general-purpose programming language. PHP is now installed on more than 244 million websites and 2.1 million web servers"
		},
		"NodeJS" : {
			"desc" : "Node.js is a software platform that is used to build scalable network (especially server-side) applications. Node.js utilizes JavaScript as its scripting language, and achieves high throughput via non-blocking I/O and a single-threaded event loop."
		},
		"JavaScript" : {
			"desc" : "an object-oriented computer programming language commonly used to create interactive effects within web browsers."
		}
	},
	"search engines" : {
		"google" : {
			"desc" : "Google Inc. is an American multinational corporation specializing in Internet-related services and products. These include search, cloud computing, software, and online advertising technologies. Most of its profits are derived from AdWords"
		},
		"ask" : {
			"desc" : "sk.com is a question answering-focused web search engine founded in 1996 by Garrett Gruener and David Warthen in Berkeley, California. The original software was implemented by Gary Chevsky from his own design."
		},
		"alta vista" : {
			"desc" : "AltaVista was an early web search engine. It was once one of the most popular search engines, but it lost ground with the rise of Google and was purchased in 2003 by Yahoo!, which retained the brand but based all AltaVista searches on its own search engine."
		}
	}
}

// this searches through our object recursively

var findSearchTerm = function(obj, term){
	
	if(obj[term]){ return obj[term];}

	for(var i in obj){
		// console.log(i, term.toLowerCase())
		if(i.replace(/ /g,'').toLowerCase() == term.replace(/ /g,'').toLowerCase()){
			return obj[i]
		}
		else{
			if(typeof obj === "object"){
				var found = findSearchTerm(obj[i], term)
				if(found){
					return found
				}
			}
		}
	}

	return false;
}

//load our main page
app.get('/', function(req, res){
	res.render('index')
});

//search route
app.get('/search', function(req, res){
	var searchResult = findSearchTerm(data, req.query.search);
	res.send(searchResult);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
