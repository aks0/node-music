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

    socket.on("broadcast", onBroadcastReceived);
    socket.on("new chunk", onReceiveNewChunk);
}

function onReceiveNewChunk(data) {
    console.log("received next chunk");
    var buffer = new Buffer(data.chunk);
    console.log(buffer);
    speaker.write(buffer).toString('utf8');
}

function onBroadcastReceived(data) {
    console.log("received = " + data.data);
}

socket.emit("data", {data: "akshay mittal"});