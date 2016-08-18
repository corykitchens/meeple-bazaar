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

.controller('AccountCtrl', ['$scope', '$window', '$firebaseAuth', function($scope, $window, $firebaseAuth) {
  $scope.user = {}
  var auth = $firebaseAuth();
  $scope.signIn = function(event) {
      event.preventDefault();
      var username = $scope.user.email;
      var password = $scope.user.password;
      var bggUser = $scope.user.bgg;
      console.log($scope.user);
      auth.$signInWithEmailAndPassword(
          username,
          password
      ).then(function(firebaseUser) {
          $window.localStorage.setItem("user", firebaseUser);
          $window.localStorage.setItem("bgg", bggUser);
          $scope.verifyBGGName(firebaseUser, bggUser);
      }, function(error) {
        console.log('Error ' + error);
      })
  }
  $scope.verifyBGGName = function(firebaseUser, bggUser) {
    //TODO
    //Refactor HTTP GET methods as its own service for codereused
    //Verify that the BGG API returns a 200 response code to ensure the bgg user exists
    var url = 'https://bgg-json.azurewebsites.net/collection/' + bggUser;
    
  };
}])

//TODO
//Poll for updated posts from BGG DEALS BOT and insert them into the database
.controller('SalesCtrl', function($scope, $http, $firebaseArray) {
    var ref = firebase.database().ref().child('reddit-bg-sales');
    $scope.current_sales = $firebaseArray(ref);
    $scope.current_sales.$loaded().then(function(games) {
        if(games.length === 0) {
            $http({
                method: 'GET',
                url: 'https://www.reddit.com/user/BGG_DEALS_BOT.json?count=20'
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


.controller('WishListCtrl', ['$scope', '$rootScope','$http', '$firebaseArray', function($scope, $rootScope, $http, $firebaseArray) {
  var bgguser = $rootScope.bgg;
  $scope.games = [];
  $http({
    method: 'GET',
    url: 'https://bgg-json.azurewebsites.net/collection/' + bgguser
  }).then(function(success) {
    var res = success.data;
    for(var i = 0; i < res.length; i++) {
      if(res[i].wishList) {
        console.log(res[i].name);
        $scope.games.push({
          name : res[i].name,
          thumbnail: res[i].thumbnail
        });
      }
    }
  }, function(error) {
    console.log('ERROR! ' + error);
  })
}])
