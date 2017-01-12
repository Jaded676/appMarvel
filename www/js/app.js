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

  .state('app.comics', {
    url: '/comics',
    views: {
      'menuContent': {
        templateUrl: 'templates/grid.html',
        controller: 'ComicsCtrl'
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

  $urlRouterProvider.otherwise('/app/comics');

  $ionicConfigProvider.views.transition('none');
});
