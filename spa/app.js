var app = angular.module('app', ['ngRoute', 'restangular']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/deck/:deck_id', {
        templateUrl: 'partials/main.html',
        controller: 'mainCtrl'
    }).when('/deck/:deck_id/review',{
        templateUrl: 'partials/review.html',
        controller: 'reviewCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);

app.config([
  "RestangularProvider",
  function(RestangularProvider){
    RestangularProvider.setBaseUrl('/api')
    RestangularProvider.setRestangularFields({id: "_id"})
}]);