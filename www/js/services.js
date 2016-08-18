angular.module('starter.services', [])

.factory('HttpGet', ['$http', function($http) {
    return function(url_to_get) {
        $http({
            method : 'GET',
            url: url_to_get, 
        }).then(function(success) {
            return success;
        }, function(error) {
            return error;
        })
    }
}])