$(function () {

$('#bassdrum808Gain').on('change', function(e) {
  var fraction = this.value / this.max;
  kick808Volume = fraction;
});

$('#snare808Gain').on('change', function(e) {
  var fraction = this.value / this.max;
  snare808Volume = fraction;
});

$('#hihat808Gain').on('change', function(e) {
  var fraction = this.value / this.max;
  hihat808Volume = fraction;
});

$('#shaker808Gain').on('change', function(e) {
  var fraction = this.value / this.max;
  shaker808Volume = fraction;
});

$('#bassdrum808pan').on('change', function(e) {
  kick808pan = this.value;
});

$('#snare808pan').on('change', function(e) {
  snare808pan = this.value;
});

$('#hihat808pan').on('change', function(e) {
  hihat808pan = this.value;
});

$('#shaker808pan').on('change', function(e) {
  shaker808pan = this.value;
});


schedule808 = function (current16thNote, time) {
    checkAndPlay(track1, kick, current16thNote, time, kick808Volume, kick808pan);
    checkAndPlay(track2, snare, current16thNote, time, snare808Volume, snare808pan);
    checkAndPlay(track3, hihat, current16thNote, time, hihat808Volume, hihat808pan);
    checkAndPlay(track4, shaker, current16thNote, time, shaker808Volume, shaker808pan);

    track1.push(track1Que[0]);
    track1Que[0] = undefined;

    track2.push(track2Que[0]);
    track2Que[0] = undefined;

    track3.push(track3Que[0]);
    track3Que[0] = undefined;

    track4.push(track4Que[0]);
    track4Que[0] = undefined;

};

//================ Play  ==================//
checkAndPlay = function (trackArray, sndToPlay, current16thNote, time, amp, pan) {
    for (var i = 0; i < trackArray.length; i += 1) {
        if (current16thNote === trackArray[i]) {
            sndToPlay.play(time, amp, pan);
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

});