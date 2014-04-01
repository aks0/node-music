var io = require('socket.io-client'),
Speaker = require('speaker'),
HOST = 'localhost',
PORT = 50010;

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

}

function onBroadcastReceived(data) {
	console.log("received = " + data.data);
}

socket.emit("data", {data: "akshay mittal"});