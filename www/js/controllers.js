angular.module('starter.controllers', [])

.controller('HotnessCtrl', function($scope, $http, $firebase, $firebaseObject, firebaseConn, boardGameGeek) {
  $scope.games = []
  $http({
    method: 'GET',
    url: 'https://bgg-json.azurewebsites.net/hot'
  }).then(function(success) {
    console.log(success);
    for (var i = 0; i < success.data.length; i++) {
      $scope.games.push({
        name : success.data[i].name,
        image : success.data[i].thumbnail
      });
      $scope.games[i] = $firebaseObject(ref.child('bgghotness').child())
    }

  }, function(error) {
    console.log(error);
  })
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})



.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


