var app = angular.module('app');

// TODO: Seperate out to a file
app.directive('focusOnSubmit', function () {
    return function (scope, form) {
        form.bind('submit', function () {
            form.children()[0].focus();
        });
    };
});

app.controller('reviewCtrl', ['$scope',
    'Restangular',
    '$routeParams',
    function ($scope, Restangular, $routeParams) {
        // $scope.refresh = function (argument) {
        $scope.cards = Restangular
            .one('decks', $routeParams.deck_id)
            .getList('cards', {
                search: 'due'
            })
            // .getList('due')
            .$object;
        // };
        // $scope.refresh();
        $scope.cardIndex = 0;
        $scope.goodBeep = new Audio("good.wav");
        $scope.badBeep = new Audio("bad.wav");
        $scope.currentCard = function () {
            return $scope.cards[$scope.cardIndex];
        };
        $scope.playQuestion = function () {
            $scope.play($scope.currentCard().question);
        };
        $scope.submitAnswer = function (answer) {
            if (answer === $scope.currentCard().answer) {
                $scope.markCorrect();
            } else {
                $scope.markWrong();
            }
        };
        $scope.markCorrect = function () {
            var card = $scope.currentCard();
            card.customPOST({
                id: card.id
            }, 'correct').then(function () {
                $scope.nextCard();
                $scope.goodBeep.play();
            }, function () {
                alert('Server error? I think.');
            });
        };
        $scope.markWrong = function () {
            $scope.currentCard().customPOST({}, 'incorrect').then(function () {
                $scope.nextCard();
                $scope.badBeep.play();
            }, function () {
                alert('Server error? I think.');
            });
        };
        $scope.nextCard = function () {
            if ($scope.cardIndex < ($scope.cards.length - 1)) {
                $scope.cardIndex++;
                $scope.playQuestion();
            } else {
                $scope.selectedLang = false; //for now.
                $scope.cards = [];
                alert('Done!');
            }
        };
        window.speechSynthesis.onvoiceschanged = function () {
            $scope.languages = window.speechSynthesis.getVoices();
            $scope.$digest();
        };
        $scope.play = function (text) {
            var msg = new SpeechSynthesisUtterance();
            msg.voice = $scope.selectedLang;
            msg.text = text;
            window.speechSynthesis.speak(msg);
        };
    }
]);