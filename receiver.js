var io = require('socket.io-client');
var Stream = require('stream');
var Speaker = require('speaker');
var HOST = 'localhost';
var PORT = 50010;
var stream = new Stream();

// create new socket instance
var socket = io.connect(HOST, {
    port: PORT
});

// Create the Speaker instance
var speaker = new Speaker({
  channels: 2,          // 2 channels
  bitDepth: 16,         // 16-bit samples
  sampleRate: 44100     // 44,100 Hz sample rate
});

socket.on("connect", onSocketConnected);

function onSocketConnected() {
    console.log("Connected to sender");

    socket.on("broad", onBroadcastReceived);

    socket.on("new chunk", onReceiveNewChunk);
}

function onReceiveNewChunk(data) {
	console.log("received next chunk");
//	console.log(data.chunk[0]);
//	process.stdout.write("akshay");
//	process.stdout.write(String.fromCharCode(data.chunk[0]));
	var str='';
	for (i in data.chunk){
    	str += String.fromCharCode(data.chunk[i]);
//    	speaker.write(String.fromCharCode(data.chunk[i]));
	}
//	process.stdout.write(str);
	speaker.write(str);
	socket.emit("next chunk");
	/*stream.pipe = function(dest) {
  		dest.write(data.chunk)
	};
	console.log("piped");
	stream.pipe(process.stdout);*/
}

function onBroadcastReceived(data) {
	console.log("received = " + data.data);
}

socket.emit("data", {data: "akshay mittal"});
socket.emit("next chunk");