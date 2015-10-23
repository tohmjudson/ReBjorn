angular.module('reBjorn').factory('GlobalsService', function($window) {
  return {
    //Program Globals
        audioContext: $window.webkitAudioContext === undefined ? new $window.AudioContext() : new $window.webkitAudioContext(),

    //====================== Transport ==========================//
        isPlaying: false,
        tempo: 120.0,
        current16thNote: 1,
        futureTickTime: 0.0,
        timerID: 0,
        lookahead   : 0.1,
        intervalTime: 25,
        nextNoteTime: null, // when the next note is happening
        currentNote : 0, // the index of the current note from 0 - 15
        intervalId  : null, // the id of the setInterval lookahead


    //====================== 303 ==========================//
    //monoSynth Arrays
        pitchesArray: [0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 0, 7],
        mutedArray: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
        accentArray: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
        portamentoArray: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
        octaveArray: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],

    //monoSynth
        baseOctave: document.getElementById('baseOctave'),
        baseOctaveDisplay: document.getElementById('baseOctaveDisplay'),
        basePitch: document.getElementById('basePitch'),
        basePitchDisplay: document.getElementById('basePitchDisplay'),
        filter01: document.getElementById('filter01'),
        filter01Display: document.getElementById('filter01Display'),
        delayTime: document.getElementById('delayTime'),
        delayTimeDisplay: document.getElementById('delayTimeDisplay'),
        delayFeedback: document.getElementById('delayFeedback'),
        delayFeedbackDisplay: document.getElementById('delayFeedbackDisplay'),
        delayCutoff: document.getElementById('delayCutoff'),
        delayCutoffDisplay: document.getElementById('delayCutoffDisplay'),
        distortion: document.getElementById('distortion'),
        distortionDisplay: document.getElementById('distortionDisplay'),
        masterGain303: document.getElementById('masterGain303'),
        masterGain303Display: document.getElementById('masterGain303Display'),
        noteLength: (60/this.tempo)/4,
        attack: 1/128,

    //====================== 808 ==========================//
        track1Que: [],
        track2Que: [],
        track3Que: [],
        track4Que: [],

        track1: [],
        track2: [],
        track3: [],
        track4: [],

        track909_1Que: [],
        track909_2Que: [],
        track909_3Que: [],
        track909_4Que: [],

        track909_1: [],
        track909_2: [],
        track909_3: [],
        track909_4: [],

        gains: {
        kick808Gain: 0.5,
        snare808Gain: 0.5,
        hihat808Gain: 0.5,
        shaker808Gain: 0.5,
        kick909Gain: 0.5,
        snare909Gain: 0.5,
        hihat909Gain: 0.5,
        shaker909Gain: 0.5
    },

        pans: {
         kick808pan: 0,
         snare808pan: 0,
         hihat808pan: 0,
         shaker808pan: 0,
         kick909pan: 0,
         snare909pan: 0,
         hihat909pan: 0,
         shaker909pan: 0
    },

        playbackRates: {
         kick808Rate: 1,
         snare808Rate: 1,
         hihat808Rate: 1,
         shaker808Rate: 1,
         kick909Rate: 1,
         snare909Rate: 1,
         hihat909Rate: 1,
         shaker909Rate: 1
    },

    //===================== Utility ===================//
    //Pitch to text conversion
        serial: [ 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C']
  };
});
