/**
 * Module dependencies.
**/

var http = require('http')
	, express = require('express')
	, mongoose = require('mongoose');
	
console.log('running mongoose version: ' + mongoose.version);

var app = express()
		.use(express.static('public'))
		.set('view engine', 'jade')
		.set('views', __dirname + '/views')
	, server = http.createServer(app)
	, io = require('socket.io').listen(server);

/*
 * The following configuration settings are necessary to force long polling and prevent the use of WebSockets.
 * The WebSockets protocol is not yet supported on the Cedar stack.
 */
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

/**
 * Routing.
 */
	
app.get('/', function(req,res,next){
	res.render('home');
});



/**
 * Data persistence.
**/
// Mongoose docs: https://github.com/LearnBoost/mongoose
// Original card list from: https://github.com/lhoang/Cards-Against-Humanity---Generator

// Connect to the database
mongoose.connect('mongodb://localhost/CAHNodedb', function(err){
	if(err) {
		console.log(err);
	} else {
		console.log('mongoose connected to the database.');
	}
});

// Define data models
var Schema = mongoose.Schema
	, ObjectId = Schema.ObjectId;

var CardSchema = new Schema({
	uniqueID: ObjectId
	, color: String
	, textcontent: String
	, id: { type: Number, index: true, unique: true }
	, expansion: String
});

var GameSchema = new Schema({
	uniqueID: ObjectId
	, users: Array
	, currentJudge: String
	, id: { type: Number, index: true, unique: true }
});

var Card = mongoose.model('Card', CardSchema);

// new Card({'color':'white','textcontent':'whatever'}).save(function(err){
// 	if(err) console.log(err);
// });

// how to select random assortment of cards?
// how to keep db and cards object in memory synced?




/**
 * Volatile data.
**/

var allCards = {}
	, games = {}
	, currentJudge = null;



/**
 * Application Logic.
**/

function setJudge (socket) {
	currentJudge = socket;
	io.sockets.emit('announcement', socket.nickname + ' is the new Judge');
	socket.emit('elected');
	socket.currentjudge = true;
	
	socket.on('disconnect', function(){
		currentJudge = null;
		io.sockets.emit('announcement', 'The judge has left the game. A new judge will be selected');
		// select new judge
		// io.sockets.sockets; select first one and elect them.
		
	})
}



/**
 * Listen.
**/


var port = process.env.PORT || 80;
server.listen(port, function() {
  console.log("Listening on " + port);
});


io.sockets.on('connection', function(socket){
	socket.on('join', function(name){
		socket.nickname = name;
		socket.broadcast.emit('announcement', name + ' joined the game.');
		
		if(!currentJudge) {
			setJudge(socket);
		} else {
			socket.emit('announcement', "Current Judge is " + currentJudge.nickname);
			//send the current card being judged
		}
		
		//send 7 cards
		
	});
	
	socket.on('text', function(msg, fn){
		socket.broadcast.emit('text', socket.nickname, msg);
		
		fn(Date.now());
	});
	
	socket.on('submit cards', function(data){
		
	});
	
	socket.on('select winner', function(data){
		
	});
	
	socket.on('submit cards', function(data){
		
	});
});