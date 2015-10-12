angular.module('reBjorn').controller('ThreeOThreeController', function($scope) {


	//================= Schedule Note =======================//
  schedule303 = function (current16thNote, time) {
      monoSynth((pitchesArray[current16thNote-1]), time, current16thNote -1, mutedArray[current16thNote-1], accentArray[current16thNote-1], portamentoArray[current16thNote-1], octaveArray[current16thNote-1]);
  }

});//===/angular.module ===//
