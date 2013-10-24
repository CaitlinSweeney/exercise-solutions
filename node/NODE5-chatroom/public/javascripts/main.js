$(function(){

	var socket = io.connect('http://localhost');

	// define our handlebars templates
	var templates = {
		users : Handlebars.compile($('#users-template').html()),
		message : Handlebars.compile($('#message-template').html()),
		notify : Handlebars.compile($('#notify-template').html())
	};

	$message = $('#message-input')
	$room = $('#room')
	$users = $('#users')
	$setUser = $('#set-user')

	var speak = function(data){
		$room.append(templates.message(data))
		// scroll the chat window to the bottom
		$room.scrollTop($room[0].scrollHeight)
	};

	var notify = function(data){
		$room.append(templates.notify(data))
		// scroll the chat window to the bottom
		$room.scrollTop($room[0].scrollHeight)
	};

	// Socket events
	socket.on('connect', function(){

		socket.on('userList', function (users) {
			$users.html(templates.users(users))
		});

		socket.on('message', function (data) {
			speak(data)
		});

		socket.on('notify', function (data) {
			notify(data)
		});
	});

	// DOM events
	$message.on('keyup', function(e){
		if(e.which == 13){
			$el = $(this)
			// send the message to the server
			socket.emit('message', $el.val());
			//clear the text input
			$el.val('')
		}
	});

	// when enter is pressed in the set user input, send the username to the server
	$setUser.on('keyup', function(e){
		if(e.which == 13){
			$el = $(this)
			// send the message to the server
			socket.emit('setUser', $el.val());
			//clear the text input
			$el.val('')
		}
	});
});
