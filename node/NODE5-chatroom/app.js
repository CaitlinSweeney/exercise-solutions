
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socketio = require('socket.io')
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

//index route
app.get('/', routes.index);

var server = http.createServer(app)

//Start a Socket.IO listen
var io = socketio.listen(server);
 
//Set the sockets.io configuration.
// This is necessary for Heroku
// sockets.configure(function() {
//   sockets.set('transports', ['xhr-polling']);
//   sockets.set('polling duration', 10);
// });

var users = {}

//If the client just connected, give them fresh data!
io.sockets.on('connection', function(socket) {

	//add each connected user to the users object
	users[socket.id] = 'User'+socket.id
	//send a list of the connected users to the user that just connected
	io.sockets.emit('userList', {users : users});
	//announce that a user has joined the chatroom
	socket.broadcast.emit('notify', {message : users[socket.id] + ' has joined.'})

    // Broadcast the message to everyone
    socket.on('message', function(message){
    	io.sockets.emit('message', {user : users[socket.id], message : message})
    });

    socket.on('disconnect', function(){
    	//broadcast the changes
    	var message = users[socket.id] + ' has left.'
    	socket.broadcast.emit('notify', {message : message});
    	io.sockets.emit('userList', {users : users})
		//remove user form users object
    	delete users[socket.id]
    });

    socket.on('setUser', function(username){
    	message = users[socket.id] + ' is now ' + username;
    	users[socket.id] = username;
    	io.sockets.emit('userList', {users : users})
    	io.sockets.emit('notify', {message : message})
    });
});

server.listen(3000, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
