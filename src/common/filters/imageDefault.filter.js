'use strict';

angular.module('iDocApp')
  .filter('imageDefault', function () {
        return function(imageUrl) {
        	return imageUrl ? imageUrl : 'assets/images/user_default.png';
        }
  });