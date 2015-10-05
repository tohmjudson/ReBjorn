$(function () {

$('#bassdrum909Gain').on('change', function(e) {
  var fraction = this.value / this.max;
  kick909Volume = fraction;
});

$('#snare909Gain').on('change', function(e) {
  var fraction = this.value / this.max;
  snare909Volume = fraction;
});

$('#hihat909Gain').on('change', function(e) {
  var fraction = this.value / this.max;
  hihat909Volume = fraction;
});

$('#shaker909Gain').on('change', function(e) {
  var fraction = this.value / this.max;
  shaker909Volume = fraction;
});

$('#bassdrum909pan').on('change', function(e) {
  kick909pan = this.value;
});

$('#snare909pan').on('change', function(e) {
  snare909pan = this.value;
});

$('#hihat909pan').on('change', function(e) {
  hihat909pan = this.value;
});

$('#shaker909pan').on('change', function(e) {
  shaker909pan = this.value;
});


schedule909 = function (current16thNote, time) {
    checkAndPlay909(track909_1, kick909, current16thNote, time, kick909Volume, kick909pan);
    checkAndPlay909(track909_2, snare909, current16thNote, time, snare909Volume, snare909pan);
    checkAndPlay909(track909_3, hihat909, current16thNote, time, hihat909Volume, hihat909pan);
    checkAndPlay909(track909_4, shaker909, current16thNote, time, shaker909Volume, shaker909pan);

    track909_1.push(track909_1Que[0]);
    track909_1Que[0] = undefined;

    track909_2.push(track909_2Que[0]);
    track909_2Que[0] = undefined;

    track909_3.push(track909_3Que[0]);
    track909_3Que[0] = undefined;

    track909_4.push(track909_4Que[0]);
    track909_4Que[0] = undefined;

};

//================ Play  ==================//
checkAndPlay909 = function (trackArray, sndToPlay, current16thNote, time, amp, pan) {
    for (var i = 0; i < trackArray.length; i += 1) {
        if (current16thNote === trackArray[i]) {
            sndToPlay.play(time, amp, pan);
        }
    }
};

//================ Div Colors ==================//
set909DivColors = function (domElementGridNote, arr) {
    for (var i = 0; i < arr.length; i += 1) {
        $(domElementGridNote + arr[i]).css("background-color", "red");
    }
};

set909DivColors('#grid909BeatTrack1-Rhyth', track909_1);
set909DivColors('#grid909BeatTrack2-Rhyth', track909_2);
set909DivColors('#grid909BeatTrack3-Rhyth', track909_3);
set909DivColors('#grid909BeatTrack4-Rhyth', track909_4);

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

});