// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'firebase', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope, $window, $firebaseAuth, $firebase) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
  })
 
  $rootScope.$on('$stateChangeStart', function() {
    $rootScope.user = $window.localStorage.getItem('user');
    $rootScope.bgg = $window.localStorage.getItem('bgg');
    $rootScope.loggedIn = $rootScope.user ? true : false;
  })

  $rootScope.logout = function(event) {
    $rootScope.user = null;
    $rootScope.bgg = null;
    $window.localStorage.clear();
  }

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  //HOTNESS
  //Top 50 current games from BoardGameGeek
  .state('tab.hotness', {
    url: '/hotness',
    views: {
      'tab-hotness': {
        templateUrl: 'templates/tab-hotness.html',
        controller: 'HotnessCtrl'
      }
    }
  })
  //SALES
  //Grabs posts from reddit/r/boardgamedeals
  //TODO - Send polling ajax request to update list
  .state('tab.sales', {
    url: '/sales',
    views: {
      'tab-sales': {
        templateUrl: 'templates/tab-sales.html',
        controller: 'SalesCtrl'
      }
    }
  })
  //ACCOUNT
  //User auth functionality
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  //Wishlist
  //Authenticated User's wishlist of games to purchase
  //Query this list in the Sales tab and perform lookup
  //for possible matches of wishlist games currently on sale
  .state('tab.wishlist', {
    url: '/wishlist',
    views: {
      'tab-wishlist': {
        templateUrl: 'templates/tab-wishlist.html',
        controller: 'WishListCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/hotness');

});
