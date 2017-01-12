angular.module('comicsMarvel', ['ionic', 'ui.router', 'comicsMarvel.controllers', 'comicsMarvel.directives', 'comicsMarvel.services', 'angular-md5'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
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

  $urlRouterProvider.otherwise('/app/playlists');

  $ionicConfigProvider.views.transition('none');
});
