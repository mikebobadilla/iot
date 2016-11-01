var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var five = require('johnny-five');
var board = new five.Board();
var connected = false;

var ledFive;

// Initialize Board
board.on('ready', function(){
	ledFive = new five.Led(3);
});

// Simple Routing
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
})

// On socket connection
io.on('connection', function(socket){

	// when button pressed light turns on
	socket.on('light', function(){
		console.log("start light");

		if(ledFive){
			ledFive.on();
			setTimeout(function(){ ledFive.off();}, 5000);
		}
	});
})

// We listen for connections on port 3000.
http.listen(3000, function(){
  console.log('listening on *:3000');
});
