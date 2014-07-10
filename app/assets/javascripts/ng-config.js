var app = angular.module('app', ['ngRoute', 'restangular', 'ng-rails-csrf']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/deck/:deck_id', {
            templateUrl: 'mainCtrl',
            controller: 'mainCtrl'
        }).when('/deck/:deck_id/review', {
            templateUrl: 'reviewCtrl',
            controller: 'reviewCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

app.config([
    "RestangularProvider",
    function (RestangularProvider) {
        RestangularProvider.setRestangularFields({
            id: "_id"
        });
    }
]);

if (!window.speechSynthesis) {
  alert("It looks like your browser does not support HTML 5 speech synthesis. Consider using Chrome or Safari..")
};