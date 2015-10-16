angular.module('controllers')

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout, $q, $http, $ionicPopup, $window) {
  $scope.loadTimes = function(stopID) {
    $scope.times = [];
    $scope.loaded = false;

    // Functions that we will use later to load times
    function get(url) {
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
    .then(function (data)  {
      if (!$rootScope.cancelLoading) {
        // Remove all images, as they will just 404
        data = data.replace (/<img[^>]*>/g, "");
        var times = $(data).find('span');
        for (var i = 4; i < times.length; i += 2) {
          var t = times[i + 1].innerText;
          if (t === 'DUE') {
            $scope.times.push (times[i].innerText + 'is due to arrive');
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
        console.log("Didn't load page because request was canceled by user");
      }
    },
    function(error) {
      if (!$rootScope.cancelLoading) {
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

  $scope.loaded = true;
});
