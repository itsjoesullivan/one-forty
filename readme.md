## one-forty

This is a wrapper around Greg Hopkins' awesome EMT 140 Plate Reverb impulse response set, located [here](http://www.hopkinsmediaservices.com/ir).

## Usage

`npm install --save one-forty`

```javascript
var one40 = require('one-forty');
var context = new AudioContext();
one40('bright-1').then(function(buffer) {
  var verb = context.createConvolver();
  verb.buffer = buffer;

  source.connect(verb);
  verb.connect(context.destination);
});
```
