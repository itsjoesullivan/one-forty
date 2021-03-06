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
