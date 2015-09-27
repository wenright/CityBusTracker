angular.module('controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $q, $http, $ionicPopup) {
  $scope.loadTimes = function (stopID) {
    $scope.times = [];
    $scope.loaded = false;

    // Functions that we will use later to load times
    function get (url) {
      var deferred = $q.defer();
      $http.get(url)
      .success(function (data) {
        deferred.resolve(data);
      })
      .error(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    get ('http://myride.gocitybus.com/public/laf/web/ViewStopNew.aspx?sp=' + stopID)
    .then (function (data)  {
      if (!$scope.cancelLoading) {
        var times = $(data).find('span');
        for (var i = 4; i < times.length; i += 2) {
          var t = times[i + 1].innerText;
          if (t === 'DUE') {
            $scope.times.push (times[i].innerText + ', DUE');
          }
          else {
            $scope.times.push (times[i].innerText + ' will arrive in ' + t);
          }
        }

        $scope.loaded = true;

        // Let the user know that there aren't any buses coming
        if ($scope.times.length === 0) {
          $ionicPopup.alert({
            title: 'No buses',
            template: 'Looks like there aren\'t any buses coming for a while'
          });
        }
      }
      else {
        console.log("Saved the day!");
      }
    },
    function (error) {
      if (!$scope.cancelLoading) {
        console.log ('Failed retrieving data from API');

        // Although it failed, we don't want user thinking it is still loading
        $scope.loaded = true;

        // Let the user know something went wrong
        $ionicPopup.alert({
          title: 'Couldn\'t load bus schedule :(',
          template: 'This could be either because of a poor connection or a bug in this program.'
        });
      }
    });
  };

  // Don't show spinner until user has selected stop to load
  $scope.loaded = true;
})

.controller('StopsCtrl', function($scope) {
  $scope.stops = [
    { name: 'Beering', index: 1, stopID: "59fb0337-fb8f-4b33-9439-3b7115ba5ce5" },
    { name: 'Physics', index: 2, stopID: "409292dd-5d54-4cb6-a594-3f4a6c53faa5" },
    { name: 'The Avenue North', index: 3, stopID: "6b50916f-1cad-461c-9492-9afe1a3e2beb" }
  ];
})

.controller('StopCtrl', function($scope, $stateParams) {
  $scope.selected = [];
  $scope.selected.name = $stateParams.name;
  $scope.selected.stopID = $stateParams.stopID;

  $scope.loadTimes ($scope.selected.stopID);

  $scope.cancelLoading = false;
  $scope.$on("$destroy", function(){
    $scope.cancelLoading = true;
  });
})

.controller('BrowseCtrl', function($scope) {

});
