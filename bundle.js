(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/joe/dev/emt140/index.js":[function(require,module,exports){
var context = new OfflineAudioContext(2, 44100, 44100);

module.exports = function(name) {
  return new Promise(function(resolve, reject) {
    var path = paths[name];
    if (typeof path === AudioBuffer) { // Cached
      return resolve(path);
    } else if (typeof path !== "string") {
      reject(new Error("Invalid impulse response name"));
    } else {
      var req = new XMLHttpRequest();
      req.open('GET', path, true);
      req.responseType = 'arraybuffer';
      req.onload = function() {
        var audioData = req.response;
        context.decodeAudioData(audioData, function(buffer) {
          paths[name] = buffer;
          resolve(buffer);
        }, function(e) {
          reject(e);
        });
      };
      req.send();
    }
  });
};

var paths = {
  "bright-1": "http://ijs.audio/emt-140/bright-1.wav",
  "bright-2": "http://ijs.audio/emt-140/bright-2.wav",
  "bright-3": "http://ijs.audio/emt-140/bright-3.wav",
  "bright-4": "http://ijs.audio/emt-140/bright-4.wav",
  "bright-5": "http://ijs.audio/emt-140/bright-5.wav",
  "dark-1": "http://ijs.audio/emt-140/dark-1.wav",
  "dark-2": "http://ijs.audio/emt-140/dark-2.wav",
  "dark-3": "http://ijs.audio/emt-140/dark-3.wav",
  "dark-4": "http://ijs.audio/emt-140/dark-4.wav",
  "dark-5": "http://ijs.audio/emt-140/dark-5.wav",
  "medium-1": "http://ijs.audio/emt-140/medium-1.wav",
  "medium-2": "http://ijs.audio/emt-140/medium-2.wav",
  "medium-3": "http://ijs.audio/emt-140/medium-3.wav",
  "medium-4": "http://ijs.audio/emt-140/medium-4.wav",
  "medium-5": "http://ijs.audio/emt-140/medium-5.wav"
};

},{}],"/Users/joe/dev/emt140/main.js":[function(require,module,exports){
var one40 = require('./index');
var context = new AudioContext();

one40('dark-1').then(function(buffer) {
  var convolver = context.createConvolver();
  convolver.buffer = buffer;
  var synth = context.createOscillator();
  synth.type = "triangle";
  synth.frequency.value = 200;
  synth.start();
  synth.connect(convolver);
  setInterval(function() {
    if (synth.frequency.value !== 500) {
      synth.frequency.value = 500;
    } else {
      synth.frequency.value = 200;
    }
  }, 500);
  convolver.connect(context.destination);
  synth.connect(context.destination);
});

},{"./index":"/Users/joe/dev/emt140/index.js"}]},{},["/Users/joe/dev/emt140/main.js"]);
