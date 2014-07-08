var app = angular.module('app');

app.controller('mainCtrl', 
               ['$scope',
                'Restangular',
                '$routeParams',
                function($scope, Restangular, $routeParams) {
    var deck_url  = 'deck/' + $routeParams.deck_id;
    $scope.cards_url = deck_url + '/cards';
    $scope.review_url = deck_url + '/review';
    $scope.getCards = Restangular.all($scope.cards_url).getList
    $scope.cards = $scope.getCards().$object;
    $scope.newCard = function() {
      $scope.cards.post({"question": $scope.question,
                         "answer": $scope.answer}).then(function() {
                        $scope.cards = $scope.getCards().$object;
                      }, function() {
                        alert('opps');
                      });
    };
    $scope.destroyCard = function(card) {
      card.remove().then(function() {
                        $scope.cards = $scope.getCards().$object;
                      }, function() {
                        alert('opps');
                      });
    };
    $scope.getCard = function () {};
}]);