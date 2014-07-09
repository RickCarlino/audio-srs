var app = angular.module('app');

app.controller('mainCtrl', ['$scope',
    'Restangular',
    '$routeParams',
    function ($scope, Restangular, $routeParams) {

        $scope.refresh = function () {
            $scope.cards = Restangular
                .one('decks', $routeParams.deck_id)
                .getList('cards')
                .$object;
        };

        $scope.refresh();

        $scope.newCard = function () {
            $scope.cards.post({
                "question": $scope.question,
                "answer": $scope.answer,
                "deck_id": $routeParams.deck_id
            }).then(function (card) {
                $scope.cards.push(card);
                $scope.answer = '';
                $scope.question = '';
            }, function () {
                alert('Try that again. Or refresh the page or something.');
            });
        };

        $scope.destroyCard = function (card) {
            card.remove().then(function () {
                $scope.refresh();
            }, function () {
                alert('opps');
            });
        };
    }
]);