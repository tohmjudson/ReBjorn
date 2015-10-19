angular.module('reBjorn').controller('ControlsController', function($scope, $window) {
  var isPlaying = false,
      tempo = 120.0,
      current16thNote = 1,
      futureTickTime = 0.0,
      timerID = 0,
      lookahead    = 0.1,
      intervalTime = 25,
      nextNoteTime = null, // when the next note is happening
      //currentNote  = 0, // the index of the current note from 0 - 15
      intervalId   = null; // the id of the setInterval lookahead

$scope.tempo = tempo;

//================ Play =======================//
  $scope.play = function($event) {
      isPlaying = !isPlaying;
      $scope.isPlaying = isPlaying;

      if (isPlaying) {
          current16thNote = 1;
          futureTickTime = audioContext.currentTime;
          $scope.scheduler();
          console.log('playing');
          return "stop";
      } else {
          $window.clearTimeout(timerID);
          console.log('stopped');
          return "play";
      }
  };

//================ Future Tick ==================//
    $scope.futureTick = function () {

        $scope.$watch('tempo', function() {
          $scope.tempo = parseInt($scope.tempo);
        });

        var secondsPerBeat = 60.0 / $scope.tempo;
        futureTickTime += 0.25 * secondsPerBeat;
        current16thNote++;
        if (current16thNote > 16) {
            current16thNote = 1;
        }
    };

//================ Scheduler ==================//
    $scope.scheduler = function() {
        while (futureTickTime < audioContext.currentTime + 0.1) {
            schedule303(current16thNote, futureTickTime);// SENDS STEP TO 303
            schedule909(current16thNote, futureTickTime);// SENDS STEP TO 909
            schedule808(current16thNote, futureTickTime);// SENDS STEP TO 808
            $scope.futureTick();
        }
        timerID = window.setTimeout($scope.scheduler, 50.0);
    };






});//===/angular.module ===//
