//Program Globals
var audioContext = new (window.AudioContext || window.webkitAudioContext);

//====================== Transport ==========================//
var isPlaying = false,
    tempo = 120.0,
    current16thNote = 1,
    futureTickTime = 0.0,
    timerID = 0,
    lookahead    = 0.1,
    intervalTime = 25,
    nextNoteTime = null, // when the next note is happening
    currentNote  = 0, // the index of the current note from 0 - 15
    intervalId   = null; // the id of the setInterval lookahead


//====================== 303 ==========================//
//monoSynth Arrays
var pitchesArray = [0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 0, 7],
    mutedArray = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    accentArray = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    portamentoArray = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    octaveArray = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];

//monoSynth
var baseOctave = document.getElementById('baseOctave'),
    baseOctaveDisplay = document.getElementById('baseOctaveDisplay'),
    basePitch = document.getElementById('basePitch'),
    basePitchDisplay = document.getElementById('basePitchDisplay'),
    filter01 = document.getElementById('filter01'),
    filter01Display = document.getElementById('filter01Display'),
    noteLength = (60/tempo)/4,
    attack = 1/128;

//====================== 808 ==========================//
// Load samples 
var kick = audioFileLoader("sounds/kick.mp3"),
    snare = audioFileLoader("sounds/snare.mp3"),
    hihat = audioFileLoader("sounds/hihat.mp3"),
    shaker = audioFileLoader("sounds/shaker.mp3");

// Track Que 
var track1Que = [],
    track2Que = [],
    track3Que = [],
    track4Que = [];

// Track Array 
var track1 = [],
    track2 = [],
    track3 = [],
    track4 = [];


var gains = {
    kick808Gain :.5,
    snare808Gain :.5,
    hihat808Gain : .5,
    shaker808Gain : .5,
    kick909Gain :.5,
    snare909Gain :.5,
    hihat909Gain : .5,
    shaker909Gain : .5
}

var pans = {
     kick808pan: 0,
     snare808pan: 0,
     hihat808pan: 0,
     shaker808pan: 0,
     kick909pan: 0,
     snare909pan: 0,
     hihat909pan: 0,
     shaker909pan: 0
}

var playbackRates = {
     kick808Rate: 1,
     snare808Rate: 1,
     hihat808Rate: 1,
     shaker808Rate: 1,
     kick909Rate: 1,
     snare909Rate: 1,
     hihat909Rate: 1,
     shaker909Rate: 1
}

//====================== 909 ==========================//
// Load samples 
var kick909 = audioFileLoader("sounds/909/kick.mp3"),
    snare909 = audioFileLoader("sounds/909/snare.mp3"),
    hihat909 = audioFileLoader("sounds/909/hihat.mp3"),
    shaker909 = audioFileLoader("sounds/909/rim.mp3");

// Track Que 
var track909_1Que = [],
    track909_2Que = [],
    track909_3Que = [],
    track909_4Que = [];

// Track Array 
var track909_1 = [],
    track909_2 = [],
    track909_3 = [],
    track909_4 = [];


//===================== Utility ===================//
//Pitch to text conversion
var serial = [ 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C'];