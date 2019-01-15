let ctrl = angular.module('playlistControllers', ['ui.router'])

const SERVER = 'https://webtechprojectoficial-gherghesan.c9users.io'

const CLIENT_ID="AIzaSyCxqaxhq7isgngvJYpNJ8MHlNh1aRD9vTU"

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

ctrl.controller('playlistController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    let $constructor = () => {
        $http.get(SERVER + '/playlists')
            .then((response) => {
                $scope.playlist = response.data
            })
            .catch((error) => console.log(error))
    }

    $scope.addPlaylist = (playlist) => {
        $http.post(SERVER + '/playlists', playlist)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $scope.deletePlaylist = (playlist) => {
        $http.delete(SERVER + '/playlists/' + playlist.id)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $scope.selected = {}

    $scope.getTemplate = (playlist) => {
        if (playlist.id == $scope.selected.id) {
            return 'edit'
        }
        return 'display'
    }

    $scope.test = () =>{
        alert("Hello");
    }

    $scope.editPlaylist = (playlist) => {
        $scope.selected = angular.copy(playlist)
    }

    $scope.cancelEditing = () => {
        $scope.selected = {}
    }

    $scope.savePlaylist = (playlist) => {
        $http.put(SERVER + '/playlists/' + playlist.id, playlist)
            .then(() => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }
    //default constructor
    $constructor()

  
    
    $scope.handleClentLoad = () => {
      gapi.load('client:auth2', initClient);
    }
    
    $scope.initClient= () => {
      gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
      }); //returns a promise
    }
    
    //get video
    
    function getVideo(){
      document.getElementById("show-video").addEventListener(function (e){
        alert("Hello!");
        e.preventDefault();
        //prepare request
        var request = gapi.client.youtube.search.list({
          part : "snippet",
          type:  "video",
          q:document.getElementById('playlistLink').value
      
        })
        //execute the request
        request.execute(function(response){
          console.log(response);
          var responseString=JSON.stringify(response, '',2);
          document.getElementById('response').innerHTML=responseString;
        });
      });
    }
  
    function onClientLoad() {
      gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
    }
    // Called automatically when YouTube API interface is loaded (see line 9).
    function onYouTubeApiLoad() {
      gapi.client.setApiKey('AIzaSyCxqaxhq7isgngvJYpNJ8MHlNh1aRD9vTU');
    
    }
    
    
  
  
}])

angular.module('loginController')
  .controller('playlistController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {
    const SERVER = 'https://webtechprojectoficial-gherghesan.c9users.io'

    let $constructor = () => {
      $http.get(SERVER + '/login/' + $stateParams.id)
        .then((response) => {
          $scope.playlist = response.data
          return $http.get(SERVER + '/login/' + $stateParams.id + '/observations')
        })
        .then((response) => {
          $scope.observations = response.data
        })
        .catch((error) => console.log(error))
    }
    
     $scope.addPlaylist = (playlist) => {
        $http.post(SERVER + '/login/' + $stateParams.id + '/playlist', playlist)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

$scope.deletePlaylist = (playlist) => {
        $http.delete(SERVER + '/login/' + $stateParams.id + '/playlists/' + playlist.id)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $scope.selected = {}

    $scope.getTemplate = (playlist) => {
      if (playlist.id == $scope.selected.id) {
        return 'edit'
      }
      return 'display'
    }

    $scope.editPlaylist = (playlist) => {
      $scope.selected = angular.copy(playlist)
    }

    $scope.cancelEditing = () => {
      $scope.selected = {}
    }

 $scope.savePlaylist = (playlist) => {
        $http.put(SERVER + '/login/' + $stateParams.id + '/playlists/' + playlist.id, playlist)
            .then(() => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $constructor()
  }])

//   const CLIENT_ID="AIzaSyCxqaxhq7isgngvJYpNJ8MHlNh1aRD9vTU"

//   const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
//   const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

  
//   function handleClentLoad(){
//     gapi.load('client:auth2', initClient);
//   }
  
//   function initClient(){
//     gapi.client.init({
//       discoveryDocs: DISCOVERY_DOCS,
//       clientId: CLIENT_ID,
//       scope: SCOPES
//     }); //returns a promise
//   }
  
//   //get video
  
//   function getVideo(){
//     document.getElementById("show-video").addEventListener(function (e){
//       alert("Hello!");
//       e.preventDefault();
//       //prepare request
//       var request = gapi.client.youtube.search.list({
//         part : "snippet",
//         type:  "video",
//         q:document.getElementById('playlistLink').value
    
//       })
//       //execute the request
//       request.execute(function(response){
//         console.log(response);
//         var responseString=JSON.stringify(response, '',2);
//         document.getElementById('response').innerHTML=responseString;
//       });
//     });
//   }

//   function onClientLoad() {
//     gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
//   }
//   // Called automatically when YouTube API interface is loaded (see line 9).
//   function onYouTubeApiLoad() {
//     gapi.client.setApiKey('AIzaSyCxqaxhq7isgngvJYpNJ8MHlNh1aRD9vTU');
  
//   }
  
  


