angular.module('reBjorn').directive('threeothreeb', function(GlobalsService) {
	return {
		restrict: 'E',
		scope: {

			
		},
		templateUrl: '/templates/303b.html',
		link: function(scope, element, attrs, ngModelCtrl) {
			  var audioContext = GlobalsService.audioContext;
			  var current16thNote = GlobalsService.current16thNote;
			  var serial = GlobalsService.serial;
			  var noteLength = (60/GlobalsService.tempo)/4;
			  var attack = 1/128;

			  scope.settingsB = {
			    baseOctave: 3,
			    basePitch: 0,
			    filter01: 20000,
			    delayTime: .75,
			    delayFeedback: .35,
			    delayCutoff: 20000,
			    delayGain: 0,
			    delayPan: 0,
			    distortion: 0,
			    masterPan: 0,
			    masterGain303: .5
			  };
			  
			  scope.modalId = attrs.modalId;
			  console.log(scope.modalId);

			  scope.stepsB = [
			    {pitch: 0, muted: false, accented: false, portamento: false, octave: false},
			    {pitch: 0, muted: true, accented: false, portamento: false, octave: false},
			    {pitch: 0, muted: true, accented: false, portamento: false, octave: false},
			    {pitch: 0, muted: true, accented: false, portamento: false, octave: false},
			    {pitch: 0, muted: false, accented: false, portamento: false, octave: false},
			    {pitch: 0, muted: true, accented: false, portamento: false, octave: false},
			    {pitch: 3, muted: true, accented: false, portamento: false, octave: false},
			    {pitch: 0, muted: true, accented: false, portamento: false, octave: false},
			    {pitch: 0, muted: false, accented: false, portamento: false, octave: false},
			    {pitch: 0, muted: true, accented: false, portamento: false, octave: false},
			    {pitch: 0, muted: true, accented: false, portamento: false, octave: false},
			    {pitch: 0, muted: true, accented: false, portamento: false, octave: false},
			    {pitch: 0, muted: false, accented: false, portamento: false, octave: false},
			    {pitch: 0, muted: true, accented: false, portamento: false, octave: false},
			    {pitch: 3, muted: true, accented: false, portamento: false, octave: false},
			    {pitch: 0, muted: true, accented: false, portamento: false, octave: false}
			  ];



			//================= Schedule Note =======================//
			  schedule303b = function(current16thNote, time) {
			  	  //console.log(scope.modalId + ": "+ current16thNote);
			      monoSynthB((scope.stepsB[current16thNote-1].pitch), time, current16thNote-1, scope.stepsB[current16thNote-1].muted, scope.stepsB[current16thNote-1].accented, scope.stepsB[current16thNote-1].portamento, scope.stepsB[current16thNote-1].octave);
			  }

			//================= Make Note =======================//
			  monoSynthB = function (note, time, current, mute, accent, port, octave) {
			    var oscillator = audioContext.createOscillator();
			    var gainNode = audioContext.createGain();
			    var delayNode = audioContext.createDelay();
			    var feedback = audioContext.createGain();
			    var delayFilter = audioContext.createBiquadFilter();
			    var delayGainNode = audioContext.createGain();
			    var delayPanNode = audioContext.createStereoPanner();
			    var muteGainNode = audioContext.createGain();
			    var accentGainNode = audioContext.createGain();
			    var masterPanNode = audioContext.createStereoPanner();
			    var masterGainNode = audioContext.createGain();
			    var filterNode = audioContext.createBiquadFilter();
			    var waveShaper = audioContext.createWaveShaper();
			    var type = $("#waveTypeB").val();
			    var filter01Freq = scope.settingsB.filter01;
			    var muted = mute;
			    var accented = accent;
			    var portamento = port;

			    oscillator.type = type;
			    if(octave){
			      oscillator.frequency.value = mtofB(note)/2.0;
			    }else{
			      oscillator.frequency.value = mtofB(note);

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
			    accentGainNode.connect(masterPanNode);
			    accentGainNode.connect(delayNode);

			    delayNode.delayTime.value = scope.settingsB.delayTime;
			    delayGainNode.gain.value = scope.settingsB.delayGain;
			    feedback.gain.value = scope.settingsB.delayFeedback;
			    delayFilter.frequency.value = scope.settingsB.delayCutoff;
			    delayPanNode.pan.value = scope.settingsB.delayPan;

			    delayNode.connect(feedback);
			    feedback.connect(delayFilter);
			    delayFilter.connect(delayPanNode);
			    delayPanNode.connect(delayGainNode);
			    delayGainNode.connect(audioContext.destination);

			/*  waveShaper.curve = makeDistortionCurve(distortion.value*100);
			    waveShaper.connect(masterPanNode);*/

			    masterPanNode.pan.value = scope.settingsB.masterPan;
			    masterPanNode.connect(masterGainNode);
			    masterGainNode.gain.value = scope.settingsB.masterGain303;
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
			  mtofB = function (note) {
			    var octaveMultiplier = scope.settingsB.baseOctave;
			    var octave = octaveMultiplier * 12;
			    var pitchAdder = 69 - parseInt(scope.settingsB.basePitch);
			    return ( Math.pow(2, (note-pitchAdder+octave) / 12) ) * 440.0;
			  }
		}

	}
});