angular.module('reBjorn').controller('ThreeOThreeController', function($scope, GlobalsService) {
  var audioContext = GlobalsService.audioContext;
  var current16thNote = GlobalsService.current16thNote;
  var serial = GlobalsService.serial;

  var baseOctave = document.getElementById('baseOctave'),
      baseOctaveDisplay = document.getElementById('baseOctaveDisplay'),
      basePitch = document.getElementById('basePitch'),
      basePitchDisplay = document.getElementById('basePitchDisplay'),
      filter01 = document.getElementById('filter01'),
      filter01Display = document.getElementById('filter01Display'),
      delayTime = document.getElementById('delayTime'),
      delayTimeDisplay = document.getElementById('delayTimeDisplay'),
      delayFeedback = document.getElementById('delayFeedback'),
      delayFeedbackDisplay = document.getElementById('delayFeedbackDisplay'),
      delayCutoff = document.getElementById('delayCutoff'),
      delayCutoffDisplay = document.getElementById('delayCutoffDisplay'),
      distortion = document.getElementById('distortion'),
      distortionDisplay = document.getElementById('distortionDisplay'),
      masterGain303 = document.getElementById('masterGain303'),
      masterGain303Display = document.getElementById('masterGain303Display'),
      noteLength = (60/GlobalsService.tempo)/4,
      attack = 1/128;



$scope.steps = [
  {pitch: 0, muted: true, accented: false, portamento: false, octave: false},
  {pitch: 2, muted: false, accented: true, portamento: false, octave: false},
  {pitch: 4, muted: false, accented: false, portamento: false, octave: false},
  {pitch: 5, muted: false, accented: false, portamento: false, octave: false},
  {pitch: 7, muted: true, accented: false, portamento: false, octave: false},
  {pitch: 9, muted: false, accented: false, portamento: false, octave: false},
  {pitch: 11, muted: false, accented: false, portamento: false, octave: false},
  {pitch: 12, muted: false, accented: false, portamento: false, octave: false},
  {pitch: 11, muted: true, accented: false, portamento: false, octave: false},
  {pitch: 9, muted: false, accented: false, portamento: false, octave: false},
  {pitch: 7, muted: false, accented: false, portamento: false, octave: false},
  {pitch: 5, muted: false, accented: false, portamento: false, octave: false},
  {pitch: 4, muted: true, accented: false, portamento: false, octave: false},
  {pitch: 2, muted: false, accented: false, portamento: false, octave: false},
  {pitch: 0, muted: false, accented: false, portamento: false, octave: false},
  {pitch: 7, muted: false, accented: false, portamento: false, octave: false}
  ];


//================= Watchers =======================//
  var $pitchmods = $('.pitchmod');
  $pitchmods.on('change', function(e) {
      var pitchData = {
      octave: baseOctave.value,
      base: basePitch.value,
      filter: filter01.value,
      delayTime:  delayTime.value,
      delayFeedback: delayFeedback.value,
      delayCutoff: delayCutoff.value,
      distortion: distortion.value,
      masterGain303: masterGain303.value
      };
    baseOctaveDisplay.innerHTML = pitchData.octave - 1;
    basePitchDisplay.innerHTML = serial[pitchData.base];    
    filter01Display.innerHTML = pitchData.filter;
    delayTimeDisplay.innerHTML = pitchData.delayTime;
    delayFeedbackDisplay.innerHTML = pitchData.delayFeedback;
    delayCutoffDisplay.innerHTML = pitchData.delayCutoff;
    distortionDisplay.innerHTML = pitchData.distortion;
    masterGain303Display.innerHTML = pitchData.masterGain303;
  });

//================= Schedule Note =======================//
  schedule303 = function (current16thNote, time) {
      monoSynth(($scope.steps[current16thNote-1].pitch), time, current16thNote-1, $scope.steps[current16thNote-1].muted, $scope.steps[current16thNote-1].accented, $scope.steps[current16thNote-1].portamento, $scope.steps[current16thNote-1].octave);
  }
//================= Make Note =======================//
  monoSynth = function (note, time, current, mute, accent, port, octave) {
    var oscillator = audioContext.createOscillator();
    var gainNode = audioContext.createGain();
    var delayNode = audioContext.createDelay();
    var feedback = audioContext.createGain();
    var delayFilter = audioContext.createBiquadFilter();
    var muteGainNode = audioContext.createGain();
    var accentGainNode = audioContext.createGain();
    var masterGainNode = audioContext.createGain();
    var filterNode = audioContext.createBiquadFilter();
    var waveShaper = audioContext.createWaveShaper();
    var type = $("#waveType").val();
    var filter01Freq= filter01.value;

    var muted = mute;
    var accented = accent;
    var portamento = port;



    oscillator.type = type;
    if(octave){
      oscillator.frequency.value = mtof(note)/2.0;
    }else{
      oscillator.frequency.value = mtof(note);
    }
    oscillator.start(time);
    oscillator.stop(time + noteLength);
    oscillator.connect(filterNode);
    
    filterNode.type = 'lowpass';
    filterNode.frequency.value = filter01Freq;
    filterNode.Q.value = 0;
    filterNode.gain.value = 0;
    filterNode.connect(gainNode);

    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(1, time + .05);

    if(portamento){
      gainNode.gain.linearRampToValueAtTime(0, time + ( noteLength + noteLength));
    } else {
      gainNode.gain.linearRampToValueAtTime(0, time + noteLength);
    }

    gainNode.connect(muteGainNode);
    if(muted) {
      muteGainNode.gain.value = 1;
    } else {
      muteGainNode.gain.value = 0;
    }
    muteGainNode.connect(accentGainNode);

    if(accented) {
      accentGainNode.gain.value = 1;
    } else {
      accentGainNode.gain.value = 0.65;
    }
    accentGainNode.connect(waveShaper);
    accentGainNode.connect(delayNode);

    delayNode.delayTime.value = delayTime.value;
    feedback.gain.value = delayFeedback.value;
    delayFilter.frequency.value = delayCutoff.value;

    delayNode.connect(feedback);
    feedback.connect(delayFilter);
    delayFilter.connect(delayNode);
    delayNode.connect(waveShaper);

    waveShaper.curve = makeDistortionCurve(distortion.value*100);
    waveShaper.connect(masterGainNode);

    masterGainNode.gain.value = masterGain303.value;
    masterGainNode.connect(audioContext.destination);
  }

//=== Distortion Effect ===//
  function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180,
        i = 0,
        x;
    for ( ; i < n_samples; ++i ) {
        x = i * 2 / n_samples - 1;
        curve[i] = ( 3 + k ) * x * 20 * deg / 
            (Math.PI + k * Math.abs(x));
    }
    return curve;
  }
//=== Convert MIDI Note to Frequency ===//
  mtof = function (note) {
    var octaveMultiplier = baseOctave.value;
    var octave = octaveMultiplier * 12;
    var pitchAdder = 69 - parseInt(basePitch.value);
    return ( Math.pow(2, (note-pitchAdder+octave) / 12) ) * 440.0;
  }
});//===/angular.module ===//
