angular.module('reBjorn').controller('TransportController', function($scope, GlobalsService, $window) {
  var current16thNote = GlobalsService.current16thNote;
  var futureTickTime = GlobalsService.futureTickTime;
  var audioContext = GlobalsService.audioContext;
  var tempo = GlobalsService.tempo;
  var isPlaying = GlobalsService.isPlaying;

  $scope.tempo = tempo;

  //================ Play =======================//

  $scope.play = function() {
    isPlaying = !isPlaying;
    $scope.isPlaying = isPlaying;

    if (isPlaying) {
      current16thNote = 1;
      currentNote = 0;
      futureTickTime = audioContext.currentTime;
      $scope.scheduler();
      return "stop";
    } else {
      $window.clearTimeout(timerID);
      return "play";
    }
  };

  //================ Future Tick ==================//
  $scope.futureTick = function() {

    $scope.$watch('tempo', function() {
      $scope.tempo = parseInt($scope.tempo);
    });

    var secondsPerBeat = 60.0 / $scope.tempo;
    futureTickTime += 0.25 * secondsPerBeat;
    current16thNote++;
    if (current16thNote > 16) {
      current16thNote = 1;
    }
    //console.log(current16thNote);
  };

  //================ Scheduler ==================//
  $scope.scheduler = function() {
    while (futureTickTime < audioContext.currentTime + 0.1) {
      scheduleNote(current16thNote, futureTickTime); // SENDS STEP TO 303
      schedule303(current16thNote, futureTickTime); // SENDS STEP TO 303
      schedule808(current16thNote, futureTickTime); // SENDS STEP TO 808
      $scope.futureTick();
    }
    timerID = $window.setTimeout($scope.scheduler, 50.0);
  };
});
