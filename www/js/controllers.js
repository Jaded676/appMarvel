angular.module('comicsMarvel.controllers', ['ui.bootstrap'])

 .controller('AppCtrl', ['$rootScope','$scope', 'ArticlesService','$state',
   function($rootScope, $scope, ArticlesService,$state) {

     // With the new view caching in Ionic, Controllers are only called
     // when they are recreated or on app start, instead of every page change.
     // To listen for when this page is active (for example, to refresh data),
     // listen for the $ionicView.enter event:
     //$scope.$on('$ionicView.enter', function(e) {
     //});
     var vm = this;
     $scope.mySelection = 'Año';

     $scope.isOnPlaylist = function () {
       if($state.current.name == "app.playlists"){
         return true;
       }
       else return false;
     };

     $scope.searchBy = function (busqueda,seleccion) {
       if(seleccion == 'Año'){
         console.log("busqueda por año");
         var promise = ArticlesService.getComics(false,busqueda);
         promise.then(
           function(comics){
             $rootScope.articles = comics.data.data.results;
             console.log($rootScope.articles);
           },
           function(reason){
             alert('Failed: ' + reason);
           }
         );
       }
       else {
         console.log("busqueda por titulo");
         var promise = ArticlesService.getComics(busqueda,false);
         promise.then(
           function(comics){
             $rootScope.articles = comics.data.data.results;
             console.log($rootScope.articles);
           },
           function(reason){
             alert('Failed: ' + reason);
           }
         );
       };
     };

   }])

.controller('PlaylistsCtrl', ['$rootScope','$scope', 'ArticlesService','md5','$http','$state',
 function($rootScope, $scope, ArticlesService, md5, $http, $state) {
   $scope.cargando = true;
   //$scope.getArticleList = function() {
     /*$scope.timeStamp = Date.now();
     var publicApiKey = "6031abba09922a77da20ccb0531f9a16";
     var privateApiKey = "9c7d2011ce9982db546cc0a55eba3a769f107506";
     var stringHash = $scope.timeStamp + publicApiKey + privateApiKey;
     var hashing = md5.createHash(stringHash);

     baseUrl = "http://gateway.marvel.com/v1/public/characters";
     $http.get(baseUrl, {
       params: {
         nameStartsWith: "iron man",
         limit: 25,
         apikey: publicApiKey,
         ts: $scope.timeStamp,
         hash: hashing
       }
     }).then(function (response) {
       console.log(response)
       });
   };*/

   $scope.goToComic = function (comicId) {
     console.log(comicId);
     var promise = ArticlesService.comicId(comicId);
     promise.then(
       function(comic){
         $rootScope.oneComic = comic.data.data.results[0];
         console.log($rootScope.oneComic);
         $state.go('app.article');
       },
       function(reason){
         alert('Failed: ' + reason);
       }
     );
   };

     var promise = ArticlesService.getComics();
     promise.then(
         function(comics){
           $rootScope.articles = comics.data.data.results;
           console.log($scope.articles);
         },
         function(reason){
           alert('Failed: ' + reason);
         }
     ).finally(function(){
       $scope.cargando = false;
       console.log("termine de cargar");
     });
 //  };

   //$scope.getArticleList();
}])

 .controller('ArticleCtrl', ['$rootScope','$scope', 'ArticlesService','md5','$http',
   function($rootScope, $scope, ArticlesService, md5, $http) {
         console.log("estoy en el comic");
         console.log($rootScope.oneComic);

   }]);
