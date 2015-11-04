angular.module('reBjorn').controller('NineONineController', function($scope, GlobalsService) {

//================ Default Files and Settings=================//

var kick909 = audioFileLoader909("sounds/909/BD/BT0A0A7.wav"),
    snare909 = audioFileLoader909("sounds/909/snare.wav"),
    hihat909 = audioFileLoader909("sounds/909/hihat.wav"),
    shaker909 = audioFileLoader909("sounds/909/rim.wav"),
	track909_1Que = [],
    track909_2Que = [],
    track909_3Que = [],
    track909_4Que = [],
    track909_1 = [],
    track909_2 = [],
    track909_3 = [],
    track909_4 = [],
    gains = {kick909Gain: 0.5, snare909Gain: 0.5, hihat909Gain: 0.5, shaker909Gain: 0.5},
	pans = {kick909pan: 0, snare909pan: 0, hihat909pan: 0, shaker909pan: 0},
	playbackRates = {kick909Rate: 1, snare909Rate: 1, hihat909Rate: 1, shaker909Rate: 1};

//================ Watchers =================//
  var $gains = $('.gain');
  $gains.on('change', function(e) {
    var fraction = this.value / this.max;
    gains[ $(this).attr('id') ] = fraction;
  });

  var $pans = $('.pan');
  $pans.on('change', function(e) {
    pans[ $(this).attr('id') ] = this.value;
  });

  var $playbackRates = $('.playbackRate');
  $playbackRates.on('change', function(e) {
    playbackRates[ $(this).attr('id') ] = this.value;
  });

  var $loadAudioFiles = $('.loadAudioFile');
  $loadAudioFiles.on('change', function(e) {
    var soundFile = this.value
    var idName = $(this).attr('id');
    //console.log(this.value +":"+idName);
    switch(idName){
      case 'BD909':
        kick909 = audioFileLoader909(soundFile);
        break;
      case 'Snr909':
        snare909 = audioFileLoader909(soundFile);
        break;
      case 'HH909':
        hihat909 = audioFileLoader909(soundFile);
        break;
      case 'ACC909': 
        shaker909 = audioFileLoader909(soundFile);
        break;
      }
 });

//================      ==================//
//================ 909  ==================//
//================      ==================//
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


function audioFileLoader909(fileDirectory) {
	    var audioContext = GlobalsService.audioContext;

	    var soundObj = {};
	    soundObj.fileDirectory = fileDirectory;

	    var getSound = new XMLHttpRequest();
	    getSound.open("GET", soundObj.fileDirectory, true);
	    getSound.responseType = "arraybuffer";
	    getSound.onload = function() {
	        audioContext.decodeAudioData(getSound.response, function(buffer) {
	            soundObj.soundToPlay = buffer;
	        });
	    }

	    getSound.send();

	    soundObj.play = function(timeVal, amplitude, pan, playbackRate) {

	        var playSound = audioContext.createBufferSource();
	        playSound.buffer = soundObj.soundToPlay;
	        playSound.playbackRate.value = playbackRate;

	        var gainNode = audioContext.createGain();
	        gainNode.gain.value = amplitude;

	        var panNode = audioContext.createStereoPanner();
	        panNode.pan.value = pan;

	        playSound.connect(panNode);
	        panNode.connect(gainNode);
	        gainNode.connect(audioContext.destination)
	        playSound.start(timeVal);
	    }

	    return soundObj;
	};


//================ Div Colors ==================//
  setDivColors909 = function (domElementGridNote, arr) {
      for (var i = 0; i < arr.length; i += 1) {
          $(domElementGridNote + arr[i]).css("background-color", "red");
      }
  };


  setDivColors909('#grid909BeatTrack1-Rhyth', track909_1);
  setDivColors909('#grid909BeatTrack2-Rhyth', track909_2);
  setDivColors909('#grid909BeatTrack3-Rhyth', track909_3);
  setDivColors909('#grid909BeatTrack4-Rhyth', track909_4);

//================ Grid ==================//
  sequenceGridToggler909 = function (classDomEle, arr) {
      $(classDomEle).on("mousedown", function () {
          var rhythmicValue = parseInt(this.id.match(/(\d+)$/)[0], 10);
          var index = arr.indexOf(rhythmicValue);
          if (index > -1) {
              arr.splice(index, 1);
              $('#' + this.id).css("background-color", "");
          } else {
              arr.push(rhythmicValue);
              $('#' + this.id).css("background-color", "red");
          }
      });
  };


  sequenceGridToggler909(".grid909-track1", track909_1);
  sequenceGridToggler909(".grid909-track2", track909_2);
  sequenceGridToggler909(".grid909-track3", track909_3);
  sequenceGridToggler909(".grid909-track4", track909_4);

});//===/angular.module ===//