window.onload = function() {

	var socket = io.connect();

	socket.on('connect', function(){
		//send a join event with your name.
		socket.emit('join', prompt('What is your nickname?'));

		//show the chat
		$('.chat-container').css('display','block');

		socket.on('announcement', function(msg){
			var li = document.createElement('li');
			li.className = 'announcement';
			li.innerHTML = msg;
			document.getElementById('messages').appendChild(li);
		});
	});

	function addMessage (from, text){
		var li = document.createElement('li');
		li.className = 'message';
		li.innerHTML = '<b>' + from + '</b>: ' + text;
		document.getElementById('messages').appendChild(li);

		return li;
	}

	var input = document.getElementById('input');
	document.getElementById('form').onsubmit = function(){
		var li = addMessage('me', input.value);
		socket.emit('text', input.value, function(date) {
			li.className = 'confirmed';
			li.title = date;
		});

		//reset the input
		input.value = '';
		input.focus();

		return false;
	};

	socket.on('text', addMessage);

};