var app = angular.module('app');

app.controller('reviewCtrl', 
               ['$scope',
                'Restangular',
                '$routeParams',
                function($scope, Restangular, $routeParams) {
                  $scope.cards_url = 'deck/'+$routeParams.deck_id+'/cards/due';
                  $scope.cards = Restangular.all($scope.cards_url).getList().$object;
                  $scope.cardIndex = 0;

                  $scope.currentCard = function(){
                    return $scope.cards[$scope.cardIndex]
                  };
                  $scope.playAnswer = function(){
                    $scope.play($scope.currentCard().answer)
                  };
                  $scope.submitAnswer = function(answer){
                    if (answer === $scope.currentCard().answer) {
                      $scope.markCorrect();
                    } else{
                      $scope.markWrong();
                    };
                  };
                  $scope.markCorrect = function(){
                    $scope.currentCard().customPOST({}, 'correct').then(function(){
                      $scope.nextCard();
                      console.log('Right.');  
                    }, function(){
                      console.log('OH NOES!');
                    });
                  };
                  $scope.markWrong = function(){
                    $scope.currentCard().customPOST({}, 'correct').then(function(){
                      $scope.nextCard();
                      console.log('Wrong.');  
                    }, function(){
                      console.log('OH NOES!');
                    });
                  };
                  $scope.nextCard = function(){
                    if ($scope.cardIndex < ($scope.cards.length - 1)) {
                      $scope.cardIndex++;
                    } else {
                      alert('Done!');
                    };
                  };
                  window.speechSynthesis.onvoiceschanged = function() {
                    $scope.languages = window.speechSynthesis.getVoices();
                    $scope.$digest();
                  };
                  $scope.play = function(text){
                    var msg = new SpeechSynthesisUtterance();
                    msg.voice = $scope.selectedLang;
                    msg.text = text;
                    window.speechSynthesis.speak(msg);
                  };
                }]);