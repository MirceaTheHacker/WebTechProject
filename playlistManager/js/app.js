'use strict'
let app = angular.module('playlistManager', [
    'ui.router',
    'playlistControllers',
    'ngMessages'
    ])

    
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/login')
    $stateProvider
         .state('info', {
            url : '/info',
            templateUrl : 'views/info.html'
        })
         .state('home', {
            url : '/home',
            templateUrl : 'views/home.html'
        })
         .state('login', {
            url : '/login',
            templateUrl : 'views/login.html',
            controller : 'loginController'
        })
        .state('playlists', {
            url : '/playlists',
            templateUrl : 'views/playlists.html',
            controller : 'playlistController'
        })
        .state('playlistDetails', {
            url : '/playlists/:id',
            templateUrl : 'views/playlist-details.html',
            controller : 'playlistDetailsController'
        })
}])
