angular.module('starter', ['ionic',  'controllers'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html',
        controller: 'BrowseCtrl'
      }
    }
  })

  .state('app.stops', {
    url: '/stops',
    views: {
      'menuContent': {
        templateUrl: 'templates/stops.html',
        controller: 'StopsCtrl'
      }
    }
  })

  .state('app.single', {
    url: '/stops/:name/:stopID',
    views: {
      'menuContent': {
        templateUrl: 'templates/stop.html',
        controller: 'StopCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/stops');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

angular.module('controllers', ['ionic'])

.factory('$localStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setArray: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getArray: function(key) {
      return JSON.parse($window.localStorage[key] || '[]');
    },
    pushArray: function(key, a) {
      var t = JSON.parse($window.localStorage[key] || '[]');

      if (t.map(function(e) { return e.name; }).indexOf(a.name) >= 0) {
        return;
      }

      t.push(a);
      $window.localStorage[key] = JSON.stringify(t);
    },
    remove: function(key, a) {
      var t = JSON.parse($window.localStorage[key] || '[]');
      var i = t.map(function(e) { return e.name; }).indexOf(a.name);
      if (i >= 0) {
        t.splice(i, 1);
        $window.localStorage[key] = JSON.stringify(t);
      }
    },
    clear: function() {
      console.log('Clearing local storage');
      $window.localStorage.clear();
    }
  };
}]);
