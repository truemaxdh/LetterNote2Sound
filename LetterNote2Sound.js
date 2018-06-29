var audioContext = new (window.AudioContext || window.webkitAudioContext)();

var Monophony = function() {
  this.oscillator = audioContext.createOscillator();
  this.gain = audioContext.createGain();
  this.oscillator.connect(this.gain);
  this.gain.connect(audioContext.destination);
  
  this.score = "";
  this.volume = 0.5;
  this.setNote = function(strScore) {
    this.score = strScore;
  }
  this.setVolume = function(volume) {
    this.volume = volume;
  }
  // OscillatorNode.type = 'sine'|'square'|'triangle'|'sawtooth';
  this.setSoundType = function(type) {
    this.oscillator.type = type;
  }
  this.play = function() {
    var now = audioContext.currentTime;

    this.parse(now);
    this.gain.gain.setValueAtTime(this.volume, now);
    
    this.oscillator.start(now);
    this.oscillator.stop(now + 8);
  }
  this.parse = function(now) {
    var octave = 4;
    var beat_sum = now;
    var beat = 1;
    var strNote = "";
    for (var i = 0; i < this.score.length; i++) {
      if (this.score[i] >= "A" && this.score[i] <= "G") {
        if (strNote != "") {
          var freq = note2freq.getFreq(strNote);
          this.oscillator.frequency.setValueAtTime(freq, beat_sum);
          beat_sum += beat;
          beat = 1;
        }
        strNote = this.score[i];
      }
    }
    /*
    this.oscillator.frequency.setValueAtTime(261.63, now);
    this.oscillator.frequency.setValueAtTime(293.66, now + 1);
    ...
    */
  }
}
