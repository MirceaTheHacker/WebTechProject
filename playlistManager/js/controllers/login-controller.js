angular.module('playlistControllers')
  .controller('loginController', ['$http', '$stateParams', '$state','$scope',
   function($http, $stateParams, $state,$scope){
       
       $scope.loginFunction=function(username,password){
      if(username=="cyber"&&password=="knights"){
        $state.transitionTo('playlists');
      }
  }
   }])