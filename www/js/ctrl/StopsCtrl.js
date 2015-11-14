angular.module('controllers')

.controller('StopsCtrl', function($scope, $localStorage, $rootScope, $state, $ionicPopup) {
  $scope.myStops = $localStorage.getArray('myStops');

  if (!($scope.myStops && $scope.myStops.length > 0)) {
    var alertPopup = $ionicPopup.alert({
      title: 'Looks like you don\'t have any stops added',
      template: 'Hit \'ok\' to head over to the browse tab where you can add some bus stops'
    });

    alertPopup.then(function(res) {
      $state.go('app.browse');
    });
  }

  var currentState = $state.current;

  // Reload the user's bus stops when they come back to this state
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (currentState.name === toState.name) {
      $scope.myStops = $localStorage.getArray('myStops');
    }
  });
});
