angular.module('starter.controllers', [])


.controller('HotnessCtrl', function($scope, $http, $firebaseArray) {
  var ref = firebase.database().ref().child('bgg-hotness');
  $scope.games = $firebaseArray(ref);
  $scope.games.$loaded().then(function(games) {
      if(games.length === 0) {
          $http({
              method: 'GET',
              url: 'https://bgg-json.azurewebsites.net/hot'
          }).then(function(success) {
              for(var i = 0; i < success.data.length; i++) {
                  $scope.games.push({
                      name : success.data[i].name,
                      thumbnail : success.data[i].thumbnail
                  })
                  $scope.games.$add({
                      name : success.data[i].name,
                      thumbnail : success.data[i].thumbnail
                  })
              }
          }, function(error) {
          })
      }
  })
})

.controller('AccountCtrl', ['$scope', '$firebaseAuth', '$firebaseObject', function($scope, $firebaseAuth, $) {
   var auth = $firebaseAuth();
   $scope.signIn = function(event) {
    event.preventDefault();
    var username = $scope.user.email;
    var password = $scope.user.password;
    auth.$signInWithEmailAndPassword(
        username,
        password
    ).then(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
    }, function(error) {
    })
   }
}])

.controller('SalesCtrl', function($scope, $http, $firebaseArray) {
    var ref = firebase.database().ref().child('reddit-bg-sales');
    $scope.current_sales = $firebaseArray(ref);
    $scope.current_sales.$loaded().then(function(games) {
        if(games.length === 0) {
            $http({
                method: 'GET',
                url: 'https://www.reddit.com/r/boardgamedeals/hot/.json?count=20'
            }).then(function(success) {
                var reddit_posts = success.data.data.children;
                for(var i = 0; i < reddit_posts.length; i++) {
                    $scope.current_sales.push({
                        title: reddit_posts[i].data.title
                    })
                    $scope.current_sales.$add({
                        title : $scope.current_sales[i].title
                    })
                }
            }, function(error) {
            })
        }
    })
})
