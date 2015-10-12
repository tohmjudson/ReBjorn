$(function () {


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