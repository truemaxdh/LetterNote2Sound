var audioContext = new (window.AudioContext || window.webkitAudioContext)();

var Monophony = function() {
  this.oscillator = audioContext.createOscillator();
  this.gain = audioContext.createGain();
  this.oscillator.connect(this.gain);
  this.gain.connect(audioContext.destination);
  
  this.score = "";
  this.volume = 0.5;
  this.oscillator.type = "sine";
  
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
    var now = audioContext.currentTime + 0.1;

    var playLen = this.parse(now);
    this.gain.gain.setValueAtTime(this.volume, now);
    
    console.log(this.oscillator);
    this.oscillator.start(now);
    this.oscillator.stop(now + playLen);
  }
  this.parse = function(now) {
    var octave = 4;
    var octave_tmp = 4;
    var octave_flag = 0;
    var beat_sum = 0;
    var beat = 1;
    var strBeat = "";
    var strNote = "";
    var strOctave = "";
    var n2f = new note2freq();
    for (var i = 0; i < this.score.length; i++) {
      if (this.score[i] >= "A" && this.score[i] <= "G" || this.score[i] == "-") {
        if (strNote != "") {
          var freq = n2f.getFreq(strNote + octave);
          console.log(strNote + "," + beat + ":" + freq + "," + beat_sum);
          this.oscillator.frequency.setValueAtTime(freq, now + beat_sum / 2);
          beat_sum += beat;
          beat = 1;
          strBeat = "";
        }
        strNote = this.score[i];
      } else if (this.score[i] == "#" || this.score[i] == "b") {
        strNote += this.score[i];
      } else if (this.score[i] == "[" || this.score[i] == "(") {
        octave_flag = 1;
        strOctave = "";
      } else if (this.score[i] == ")") {
        octave_tmp = Number(strOctave);
        octave_flag = 0;
      } else if (this.score[i] == "]") {
        octave_tmp = Number(strOctave);
        octave = Number(strOctave);
        octave_flag = 0;
      } else if (this.score[i] >= "0" && this.score[i] <= "9" || this.score[i] == ".") {
        if (octave_flag > 0) {
          strOctave += this.score[i];
        }
        strBeat += this.score[i];
        beat = Number(strBeat);
      }
    }
    if (strNote != "") {
      var freq = n2f.getFreq(strNote + octave);
      console.log(strNote + "," + beat + ":" + freq + "," + beat_sum);
      this.oscillator.frequency.setValueAtTime(freq, now + beat_sum / 2);
      beat_sum += beat;
      this.oscillator.frequency.setValueAtTime(0, now + beat_sum / 2);
    }
    
    return Math.ceil(beat_sum);
  }
}
