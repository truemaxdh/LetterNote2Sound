var audioContext = new (window.AudioContext || window.webkitAudioContext)();

var Monophony = function() {
  this.oscillator = audioContext.createOscillator();
  this.gain = audioContext.createGain();
  this.oscillator.connect(this.gain);
  this.gain.connect(audioContext.destination);
  
  this.note = "";
  this.volume = 0.5;
  this.setNote = function(noteStr) {
    this.note = noteStr;
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

    this.parse(this.note, now);
    this.gain.gain.setValueAtTime(this.volume, now);
    
    this.oscillator.start(now);
    this.oscillator.stop(now + 8);
  }
  this.parse = function(note, now) {
    /*
    this.oscillator.frequency.setValueAtTime(261.63, now);
    this.oscillator.frequency.setValueAtTime(293.66, now + 1);
    ...
    */
  }
}
