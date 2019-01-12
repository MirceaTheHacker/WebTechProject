angular.module('taskControllers')
  .controller('loginController', ['$http', '$stateParams', '$state','$scope',
   function($http, $stateParams, $state,$scope){
       
       $scope.loginFunction=function(username,password){
      if(username=="admin"&&password=="admin"){
        $state.transitionTo('home');
      }
  }
   }])