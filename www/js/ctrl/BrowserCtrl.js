angular.module('controllers')

.controller('BrowseCtrl', function($scope, $http, $localStorage) {
  $scope.stops = [
    { name: 'Beering', index: 0, stopID: "59fb0337-fb8f-4b33-9439-3b7115ba5ce5" },
    { name: 'Physics', index: 1, stopID: "409292dd-5d54-4cb6-a594-3f4a6c53faa5" },
    { name: 'The Avenue North', index: 2, stopID: "6b50916f-1cad-461c-9492-9afe1a3e2beb" },
    { name: 'PMU', index: 3, stopID: "2fcc1a50-f11b-4c6c-9a37-fbfe8b35d4cd" }
  ];

  var myStops = $localStorage.getArray('myStops');
  for (var i = 0; i < myStops.length; i++) {
    var stop = myStops[i];
    $scope.stops[stop.index].active = stop.active;
  }

  $scope.search = {};

  $scope.search = function() {

  };

  $scope.toggle = function(stop) {
    if (stop.active) {
      $localStorage.pushArray('myStops', stop);
    }
    else {
      $localStorage.remove('myStops', stop);
    }
  };
});
