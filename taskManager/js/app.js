'use strict'
let app = angular.module('taskManager', [
    'ui.router',
    'taskControllers',
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
        .state('tasks', {
            url : '/tasks',
            templateUrl : 'views/tasks.html',
            controller : 'taskController'
        })
        .state('taskDetails', {
            url : '/tasks/:id',
            templateUrl : 'views/task-details.html',
            controller : 'taskDetailsController'
        })
}])