'use strict';

/* Services */

var servicesModule = angular.module('comicsMarvel.services', []);

servicesModule.factory('ArticlesService', ['$q', '$http','md5',
    function ($q, $http, md5) {
      var publicKey = '6031abba09922a77da20ccb0531f9a16';
      var privateKey = '9c7d2011ce9982db546cc0a55eba3a769f107506';
      var ts = Date.now();

      var hash = md5.createHash(ts+privateKey+publicKey);
      var baseUrl = 'http://gateway.marvel.com/v1/';

      return {
        getComics: getComics,
        comicId: comicId
      };

      function getComics(titleComic,startYear) {
        var def = $q.defer();
        if(titleComic){
          $http.get(baseUrl + 'public/comics', {
            params: {
              ts: ts,
              apikey: publicKey,
              hash: hash,
              limit: 50,
              format: "comic",
              titleStartsWith: titleComic
            }
          })
            .then(def.resolve)
            .catch(def.reject);

          return def.promise;
        }
        if(startYear){
          $http.get(baseUrl + 'public/comics', {
            params: {
              ts: ts,
              apikey: publicKey,
              hash: hash,
              limit: 50,
              format: "comic",
              startYear: startYear
            }
          })
            .then(def.resolve)
            .catch(def.reject);

          return def.promise;
        }
        else{
          $http.get(baseUrl + 'public/comics', {
            params: {
              ts: ts,
              apikey: publicKey,
              hash: hash,
              limit: 50,
              format: "comic"
            }
          })
            .then(def.resolve)
            .catch(def.reject);
          return def.promise;
        }
      };

      function comicId(comicId) {
        var def = $q.defer();

        $http.get(baseUrl + 'public/comics/'+comicId, {
          params: {
            ts: ts,
            apikey: publicKey,
            hash: hash
          }
        })
          .then(def.resolve)
          .catch(def.reject);
        return def.promise;
      }
    }

]);
