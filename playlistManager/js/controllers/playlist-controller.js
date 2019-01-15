let ctrl = angular.module('playlistControllers', ['ui.router'])

const SERVER = 'https://webtechprojectoficial-gherghesan.c9users.io'

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



