angular.module('controllers')

.controller('StopCtrl', function($scope, $rootScope, $stateParams) {
  $scope.selected = [];
  $scope.selected.name = $stateParams.name;
  $scope.selected.stopID = $stateParams.stopID;

  $scope.loadTimes($scope.selected.stopID);

  $rootScope.cancelLoading = false;
  $scope.$on("$destroy", function() {
    $rootScope.cancelLoading = true;
  });
});
