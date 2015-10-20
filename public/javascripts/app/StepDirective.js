
angular.module('reBjorn').directive('step', function(){
	return {
		transclude: true,
		scope: {},
		templateUrl: '/templates/step.html',
		restrict: 'E',
		controller: function($scope){
			$scope.identifier;
			$scope.min;
			$scope.max;
			$scope.val;
			$scope.muteCheck;
		},
		link: function(scope, element, attrs) {
			scope.identifier = attrs.identifier;
			scope.min = attrs.min;
			scope.max = attrs.max;
			scope.val = parseInt(attrs.val);
			scope.muteCheck = attrs.muteCheck;
		}
	}
});