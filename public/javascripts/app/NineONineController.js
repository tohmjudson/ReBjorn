angular.module('reBjorn').controller('NineONineController', function($scope) {

var kick909 = audioFileLoader("sounds/909/BD/BT0A0A7.wav"),
    snare909 = audioFileLoader("sounds/909/snare.wav"),
    hihat909 = audioFileLoader("sounds/909/hihat.wav"),
    shaker909 = audioFileLoader("sounds/909/rim.wav");

var $loadAudioFiles = $('.loadAudioFile');
  $loadAudioFiles.on('change', function(e) {
    var soundFile = this.value
    var idName = $(this).attr('id');

    switch(idName){
      case 'BD909':
        kick909 = audioFileLoader(soundFile);
        break;
      case 'Snr909':
        snare909 = audioFileLoader(soundFile);
        break;
      case 'HH909':
        hihat909 = audioFileLoader(soundFile);
        break;
      case 'ACC909': 
        shaker909 = audioFileLoader(soundFile);
        break;
      }

  });

  schedule909 = function (current16thNote, time) {
      checkAndPlay909(track909_1, kick909, current16thNote, time, gains.kick909Gain, pans.kick909pan, playbackRates.kick909Rate);
      checkAndPlay909(track909_2, snare909, current16thNote, time, gains.snare909Gain, pans.snare909pan, playbackRates.snare909Rate);
      checkAndPlay909(track909_3, hihat909, current16thNote, time, gains.hihat909Gain, pans.hihat909pan, playbackRates.hihat909Rate);
      checkAndPlay909(track909_4, shaker909, current16thNote, time, gains.shaker909Gain, pans.shaker909pan, playbackRates.shaker909Rate);

      track909_1.push(track909_1Que[0]);
      track909_1Que[0] = undefined;

      track909_2.push(track909_2Que[0]);
      track909_2Que[0] = undefined;

      track909_3.push(track909_3Que[0]);
      track909_3Que[0] = undefined;

      track909_4.push(track909_4Que[0]);
      track909_4Que[0] = undefined;

  };

//================ Play 909 ==================//
  checkAndPlay909 = function (trackArray, sndToPlay, current16thNote, time, gain, pan, rate) {
      for (var i = 0; i < trackArray.length; i += 1) {
          if (current16thNote === trackArray[i]) {
              sndToPlay.play(time, gain, pan, rate);
          }
      }
  };




});//===/angular.module ===//