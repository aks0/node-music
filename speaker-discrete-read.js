var fs = require('fs');
var Speaker = require('speaker');

// Create the Speaker instance
var speaker = new Speaker({
  channels: 2,          // 2 channels
  bitDepth: 16,         // 16-bit samples
  sampleRate: 44100     // 44,100 Hz sample rate
});

var readable = fs.createReadStream('song.wav');
readable.on('data', function(chunk) {
    console.log('got %d bytes of data', chunk.length);
    // Uses the Buffer to convert the array of bytes to string. This is done
    // since 'speaker' expects string.
    var buffer = new Buffer(chunk);
    console.log(buffer);
    speaker.write(buffer).toString('utf8');
});