function audioFileLoader(fileDirectory) {
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

}