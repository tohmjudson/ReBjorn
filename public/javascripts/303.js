$(function() {
//================= Watchers =======================//

var $pitchmods = $('.pitchmod');
$pitchmods.on('change', function(e) {
    var pitchData = {
    octave: baseOctave.value,
    base: basePitch.value,
    filter: filter01.value
    };
  baseOctaveDisplay.innerHTML = pitchData.octave - 1;
  basePitchDisplay.innerHTML = serial[pitchData.base];    
  filter01Display.innerHTML = pitchData.filter;
});

var $numbers = $('.number');
$numbers.on('change', function(e) {

  pitchesArray[ $(this).data("id") ] = $(this).val();
});

var $mutes = $('.muteBox:checkbox');
$mutes.on('change', function(e) {
  mutedArray[ $(this).val() ] = $(this).is(':checked');
});

var $accents = $('.accentBox:checkbox');
$accents.on('change', function(e) {
  accentArray[ $(this).val() ] = $(this).is(':checked');
});

schedule303 = function (current16thNote, time) {
    currentNote = ++currentNote % pitchesArray.length;
    monoSynth((pitchesArray[current16thNote-1]), time, current16thNote -1, mutedArray[current16thNote-1], accentArray[current16thNote-1]);
}


//TODO: ALL MUTE, OCTAVE, GLIDE, FILTER MOVEMENT, REVERB
//ACCENT IN PROGRESS: not quite right , but working
monoSynth = function (note, time, current, mute, accent) {
  var oscillator = audioContext.createOscillator();
  var gainNode = audioContext.createGain();
  var muteGainNode = audioContext.createGain();
  var accentGainNode = audioContext.createGain();
  var filterNode = audioContext.createBiquadFilter();
  var type = $("#waveType").val();
  var filter01Freq= filter01.value;
  var muted = mute;
  var accented = accent;

//OSC > Filter > Env > Mute > Accent > Delay
  oscillator.type = type;
  oscillator.frequency.value = mtof(note);
  oscillator.start(time);
  oscillator.stop(time + noteLength);
  oscillator.connect(filterNode);
  
  filterNode.type = 'lowpass';
  filterNode.frequency.value = filter01Freq;
  filterNode.Q.value = 0;
  filterNode.gain.value = 0;
  filterNode.connect(gainNode);

  gainNode.gain.setValueAtTime(0, time);
  gainNode.gain.linearRampToValueAtTime(1, time + attack);
  gainNode.gain.linearRampToValueAtTime(0, time + noteLength);
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
  accentGainNode.connect(audioContext.destination);
}


mtof = function (note) {
  var octaveMultiplier = baseOctave.value;
  var octave = octaveMultiplier * 12;
  var pitchAdder = 69 - parseInt(basePitch.value);
  return ( Math.pow(2, (note-pitchAdder+octave) / 12) ) * 440.0;
}


});
