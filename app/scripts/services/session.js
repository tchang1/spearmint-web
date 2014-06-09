'use strict';

angular.module('spearmintWebApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
