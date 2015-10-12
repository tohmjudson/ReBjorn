angular.module('reBjorn').controller('EightOEightController', function($scope) {

var kick808 = audioFileLoader("sounds/808/BD01.wav"),
    snare808 = audioFileLoader("sounds/808/Snr01.wav"),
    hihat808 = audioFileLoader("sounds/808/HH01.wav"),
    shaker808 = audioFileLoader("sounds/808/CL01.wav");

var $loadAudioFiles = $('.loadAudioFile');
  $loadAudioFiles.on('change', function(e) {
    var soundFile = this.value
    var idName = $(this).attr('id');

    switch(idName){
      case 'BD808':
        kick808 = audioFileLoader(soundFile);
        break;
      case 'Snr808':
        snare808 = audioFileLoader(soundFile);
        break;
      case 'HH808':
        hihat808 = audioFileLoader(soundFile);
        break;
      case 'ACC808': 
        shaker808 = audioFileLoader(soundFile);
        break;
      }

  });

  schedule808 = function (current16thNote, time) {
      checkAndPlay(track1, kick808, current16thNote, time, gains.kick808Gain, pans.kick808pan, playbackRates.kick808Rate);
      checkAndPlay(track2, snare808, current16thNote, time, gains.snare808Gain, pans.snare808pan, playbackRates.snare808Rate);
      checkAndPlay(track3, hihat808, current16thNote, time, gains.hihat808Gain, pans.hihat808pan, playbackRates.hihat808Rate);
      checkAndPlay(track4, shaker808, current16thNote, time, gains.shaker808Gain, pans.shaker808pan, playbackRates.shaker808Rate);

      track1.push(track1Que[0]);
      track1Que[0] = undefined;

      track2.push(track2Que[0]);
      track2Que[0] = undefined;

      track3.push(track3Que[0]);
      track3Que[0] = undefined;

      track4.push(track4Que[0]);
      track4Que[0] = undefined;

  };

//================ Play 808 ==================//
  checkAndPlay = function (trackArray, sndToPlay, current16thNote, time, gain, pan, rate) {
      for (var i = 0; i < trackArray.length; i += 1) {
          if (current16thNote === trackArray[i]) {
              sndToPlay.play(time, gain, pan, rate);
          }
      }
  };




});//===/angular.module ===//