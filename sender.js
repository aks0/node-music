var io = require('socket.io');
var fs = require('fs');
var wav = require('wav');

var PORT = 50010;
socket = io.listen(PORT);
socket.sockets.on('connection', onClientConnection);

var size = 1024;
var file = fs.createReadStream('song.wav');
var chunk;

function onClientConnection(client) {
	console.log('CONNECTED: ' + client.id);
	client.on('data', onReceiveData);

	client.on('next chunk', onSendNextChunk);
}

function onReceiveData(data) {
	console.log("data = " + data.data);
	this.broadcast.emit("broad", {data: "mittal akshay"});
}

function onSendNextChunk() {
	chunk = file.read(size);
	if (chunk !== null) {
		this.broadcast.emit("new chunk", {data: chunk});
		this.emit("new chunk", {data: chunk});
	}
}