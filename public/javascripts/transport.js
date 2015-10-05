$(function () {

//================ Play Button==================//
$("#play-button").on("click", function () {
    play();
});

//================ Tempo Slider==================//
$("#tempo").on("change", function () {
    tempo = this.value;
    $("#showTempo").html(tempo);
});

//================ Play ========================//


//Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<i class="ion-play"></i>';
var playerBarPauseButton = '<i class="ion-pause"></i>';

var $playPauseButton = $('.play-pause');

$(document).ready(function() {
    $playPauseButton.click(play);   
});


play = function() {
    isPlaying = !isPlaying;

    if (isPlaying) {
        current16thNote = 1;
        currentNote = 0;
        futureTickTime = audioContext.currentTime;
        scheduler();
        $playPauseButton.html(playerBarPauseButton);
        return "stop";
    } else {
        window.clearTimeout(timerID);
        $playPauseButton.html(playerBarPlayButton);
        return "play";
    }
}

//================ Future Tick ==================//
futureTick = function () {
    var secondsPerBeat = 60.0 / tempo;
    futureTickTime += 0.25 * secondsPerBeat;
    current16thNote++;
    if (current16thNote > 16) {
        current16thNote = 1;
    }
}

//================ Scheduler ==================//
scheduler = function() {
    while (futureTickTime < audioContext.currentTime + 0.1) {
        schedule303(current16thNote, futureTickTime);// SENDS STEP TO 303
        schedule909(current16thNote, futureTickTime);// SENDS STEP TO 909
        schedule808(current16thNote, futureTickTime);// SENDS STEP TO 808

        //scheduleStep(current16thNote, futureTickTime);// Display Info for Debug
        
        futureTick();
    }
    timerID = window.setTimeout(scheduler, 50.0);
}

});