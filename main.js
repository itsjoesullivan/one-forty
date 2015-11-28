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
