var fft = require('fft-js').fft,
    fftUtil = require('fft-js').util,
    signal = [ 28.304813,  23.329344,  19.118235, -29.250175, -29.250175,
        -29.250175];

var phasors= fft(signal);
console.log(phasors);


var frequencies = fftUtil.fftFreq(phasors, 8000), // Sample rate and coef is just used for length, and frequency step
    magnitudes = fftUtil.fftMag(phasors); 

var both = frequencies.map(function (f, ix) {
    return {frequency: f, magnitude: magnitudes[ix]};
});

console.log(both);