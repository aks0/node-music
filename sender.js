var io = require('socket.io');
var fs = require('fs');
var wav = require('wav');

// listen on this port for receiver connections
var PORT = 50010;
var io = io.listen(PORT);
io.sockets.on('connection', onClientConnection);

/**
 * chunk size of the audio file sent each time
 * 8192 - appropriate chunk size and causes uninterrupted
 * streaming of audio. Smaller sizes run the risk of
 * making the soundcard buffer to be empty at some points
 * and cause shimmering audio sound
 */
var size = 8192;
// last chunk that was broadcasted
var chunk;
var file = fs.createReadStream('song.wav');
file.on('data', onChunkAvailable);

function onClientConnection(client) {
    console.log('CONNECTED: ' + client.id);

    client.on('data', onReceiveData);
}

function onReceiveData(data) {
    console.log("data = " + data.data);
    io.sockets.emit("broadcast", {data: "mittal akshay"});
}

function onChunkAvailable(chunk) {
    io.sockets.emit("new chunk", {chunk: chunk});
}