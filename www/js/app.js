angular.module('comicsMarvel', ['ionic', 'ui.router', 'comicsMarvel.controllers', 'comicsMarvel.directives', 'comicsMarvel.services', 'angular-md5'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
    
  .state('app.playlists', {
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'templates/grid.html',
        controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('app.article', {
    url: '/article/:articleId',
    views: {
      'menuContent': {
        templateUrl: 'templates/article.html',
        controller: 'ArticleCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');

  $ionicConfigProvider.views.transition('none');
});
