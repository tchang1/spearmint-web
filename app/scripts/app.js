'use strict';

angular.module('spearmintWebApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'angulartics',
  'angulartics.google.analytics',
  'ngAnimate', 
  'angular-gestures'
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
      .when('/setgoal', {
        templateUrl: 'partials/setgoal',
        controller: 'GoalCtrl'
      })
      .when('/setamount', {
        templateUrl: 'partials/setamount',
        controller: 'GoalCtrl'
      })
      .when('/home', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/settings', {
          templateUrl: 'partials/settings',
          controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
      
    //Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  });
  // .run(function ($rootScope, $location, Auth) {

  //   // Redirect to login if route requires auth and you're not logged in
  //   $rootScope.$on('$routeChangeStart', function (event, next) {
      
  //     if (next.authenticate) {
  //       $location.path('/login');
  //     }
  //   });
  // });