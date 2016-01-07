angular.module('reBjorn').factory('GlobalsService', function($window) {
//Program Globals
  return {
    //====================== Audiokit  ==========================//
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

    //===================== Utility ============================//
    //Pitch to Text Conversion
        serial: [ 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C'],
  };
});