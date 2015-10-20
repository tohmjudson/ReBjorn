angular.module('reBjorn').controller('ThreeOThreeController', function($scope) {

var pitchesArray = [0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 0, 7],
	mutedArray = [true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    accentArray = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    portamentoArray = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    octaveArray = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];

      $scope.change = function() {
			alert('change');
      };

	//================= Schedule Note =======================//
  schedule303 = function (current16thNote, time) {
      monoSynth((pitchesArray[current16thNote-1]), time, current16thNote -1, mutedArray[current16thNote-1], accentArray[current16thNote-1], portamentoArray[current16thNote-1], octaveArray[current16thNote-1]);
  	  console.log(current16thNote-1);
  }

});//===/angular.module ===//
