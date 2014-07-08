var app = angular.module('app');

app.controller('reviewCtrl', 
               ['$scope',
                'Restangular',
                '$routeParams',
                function($scope, Restangular, $routeParams) {

                  var deck_url  = 'deck/' + $routeParams.deck_id;
                  $scope.cards_url = deck_url + '/cards';
                  $scope.review_url = deck_url + '/review';
                  $scope.getCards = Restangular.all($scope.cards_url + '/due').getList
                  $scope.cards = $scope.getCards().$object;

                  window.speechSynthesis.onvoiceschanged = function() {
                    $scope.languages = window.speechSynthesis.getVoices();
                    $scope.$apply();
                  };
                  $scope.play = function(text){
                    var msg = new SpeechSynthesisUtterance();
                    msg.voice = $scope.selectedLang;
                    msg.text = text;
                    window.speechSynthesis.speak(msg);
                  };
                }]);