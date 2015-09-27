// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.controller('StarterCtrl', function($scope, $q, $ionicPopup) {
  // Functions that we will use later to load times
  function asyncLoad (url) {
    return $q (function (success, failure) {
      setTimeout (function () {
        $.get (url, function(data) {
          success (data);
        })
        .fail (function () {
          failure ();
        });
      }, 5000);
    });
  }

  $scope.loadTimes = function () {
    $scope.loaded = false;

    asyncLoad ('http://myride.gocitybus.com/public/laf/web/ViewStopNew.aspx?sp=' + $scope.selected.stopID)
    .then (function (data)  {
      $scope.times = [];

      var times = $(data).find('span');
      for (var i = 4; i < times.length; i += 2) {
        $scope.times.push (times[i].innerText + ", " + times[i + 1].innerText);
      }

      $scope.loaded = true;
    },
    function () {
      console.log ('Failed retrieving data from API');

      // Although it failed, we don't want user thinking it is still loading
      $scope.loaded = true;

      // Let the user know something went wrong
      $ionicPopup.alert({
        title: 'Couldn\'t load bus schedule :(',
        template: 'This could be either because of a poor connection or a bug in this program.'
      });
    });
  };

  // Don't show spinner until user has selected stop to load
  $scope.loaded = true;

  // These are the different bus stops that the user can pick from
  $scope.stops = {
    beering: {
      name: "Beering",
      stopID: "59fb0337-fb8f-4b33-9439-3b7115ba5ce5"
    },
    physics: {
      name: "Physics",
      stopID: "409292dd-5d54-4cb6-a594-3f4a6c53faa5"
    },
    avenue: {
      name: "The Avenue North",
      stopID: "6b50916f-1cad-461c-9492-9afe1a3e2beb"
    }
  };

  $scope.selected = $scope.stops.beering;

  $scope.loadTimes ();
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
