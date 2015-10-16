angular.module('controllers')

.controller('StopsCtrl', function($scope, $localStorage, $rootScope, $state) {
  $scope.myStops = $localStorage.getArray('myStops');

  var currentState = $state.current;

  // Reload the user's bus stops when they come back to this state
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (currentState.name === toState.name) {
      $scope.myStops = $localStorage.getArray('myStops');
    }
  });
});
