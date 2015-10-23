$(function () {
//================ Default Files =================//
var kick808 = audioFileLoader("sounds/808/BD01.wav"),
    snare808 = audioFileLoader("sounds/808/Snr01.wav"),
    hihat808 = audioFileLoader("sounds/808/HH01.wav"),
    shaker808 = audioFileLoader("sounds/808/CL01.wav"),
    kick909 = audioFileLoader("sounds/909/BD/BT0A0A7.wav"),
    snare909 = audioFileLoader("sounds/909/snare.wav"),
    hihat909 = audioFileLoader("sounds/909/hihat.wav"),
    shaker909 = audioFileLoader("sounds/909/rim.wav");

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

//================      ==================//
//================ 808  ==================//
//================      ==================//
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


//================ Div Colors ==================//
  setDivColors = function (domElementGridNote, arr) {
      for (var i = 0; i < arr.length; i += 1) {
          $(domElementGridNote + arr[i]).css("background-color", "red");
      }
  };

  setDivColors('#grid808BeatTrack1-Rhyth', track1);
  setDivColors('#grid808BeatTrack2-Rhyth', track2);
  setDivColors('#grid808BeatTrack3-Rhyth', track3);
  setDivColors('#grid808BeatTrack4-Rhyth', track4);

  setDivColors('#grid909BeatTrack1-Rhyth', track909_1);
  setDivColors('#grid909BeatTrack2-Rhyth', track909_2);
  setDivColors('#grid909BeatTrack3-Rhyth', track909_3);
  setDivColors('#grid909BeatTrack4-Rhyth', track909_4);

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

  sequenceGridToggler(".grid909-track1", track909_1);
  sequenceGridToggler(".grid909-track2", track909_2);
  sequenceGridToggler(".grid909-track3", track909_3);
  sequenceGridToggler(".grid909-track4", track909_4);
});