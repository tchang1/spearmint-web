'use strict';

angular.module('spearmintWebApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'angulartics',
  'angulartics.google.analytics',
  'ngAnimate'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/welcome',
        controller: 'WelcomeCtrl'
      })
      .when('/ftu', {
        templateUrl: 'partials/ftu',
        controller: 'FTUCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
      
    // Intercept 401s and redirect you to login
  //   $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
  //     return {
  //       'responseError': function(response) {
  //         if(response.status === 401) {
  //           $location.path('/login');
  //           return $q.reject(response);
  //         }
  //         else {
  //           return $q.reject(response);
  //         }
  //       }
  //     };
  //   }]);
  // })
  // .run(function ($rootScope, $location, Auth) {

  //   // Redirect to login if route requires auth and you're not logged in
  //   $rootScope.$on('$routeChangeStart', function (event, next) {
      
  //     if (next.authenticate && !Auth.isLoggedIn()) {
  //       $location.path('/login');
  //     }
  //   });
  });