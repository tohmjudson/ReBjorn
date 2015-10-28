angular.module('reBjorn').controller('EightOEightController', function($scope, GlobalsService) {

//================ Default Files and Settings=================//

var kick808 = audioFileLoader("sounds/808/BD01.wav"),
    snare808 = audioFileLoader("sounds/808/Snr01.wav"),
    hihat808 = audioFileLoader("sounds/808/HH01.wav"),
    shaker808 = audioFileLoader("sounds/808/CL01.wav"),
		track1Que = [],
    track2Que = [],
    track3Que = [],
    track4Que = [],
    track1 = [],
    track2 = [],
    track3 = [],
    track4 = [],
    gains = {kick808Gain: 0.5, snare808Gain: 0.5, hihat808Gain: 0.5, shaker808Gain: 0.5},
		pans = {kick808pan: 0, snare808pan: 0, hihat808pan: 0, shaker808pan: 0},
		playbackRates = {kick808Rate: 1, snare808Rate: 1, hihat808Rate: 1, shaker808Rate: 1};

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

//================ Schedule Note to be played ==================//
  schedule808 = function (current16thNote, time) {
  	//console.log(current16thNote);
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

//================ Play 808 Soundfiles ==================//
	checkAndPlay = function (trackArray, sndToPlay, current16thNote, time, gain, pan, rate) {
	  for (var i = 0; i < trackArray.length; i += 1) {
	      if (current16thNote === trackArray[i]) {
	          sndToPlay.play(time, gain, pan, rate);
	      }
	  }
	};

	function audioFileLoader(fileDirectory) {
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
	setDivColors = function (domElementGridNote, arr) {
	  for (var i = 0; i < arr.length; i += 1) {
	      $(domElementGridNote + arr[i]).css("background-color", "red");
	  }
	};

	setDivColors('#grid808BeatTrack1-Rhythm', track1);
	setDivColors('#grid808BeatTrack2-Rhythm', track2);
	setDivColors('#grid808BeatTrack3-Rhythm', track3);
	setDivColors('#grid808BeatTrack4-Rhythm', track4);

	//================ Grid ==================//
	sequenceGridToggler = function (classDomEle, arr) {
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

	sequenceGridToggler(".grid808-track1", track1);
	sequenceGridToggler(".grid808-track2", track2);
	sequenceGridToggler(".grid808-track3", track3);
	sequenceGridToggler(".grid808-track4", track4);

});//===/angular.module ===//