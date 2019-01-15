angular.module('playlistControllers')
  .controller('playlistDetailsController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {
    const SERVER = 'https://webtechprojectoficial-gherghesan.c9users.io' 

    let $constructor = () => {
      $http.get(SERVER + '/playlitsts/' + $stateParams.id)
        .then((response) => {
          $scope.playlist = response.data
          return $http.get(SERVER + '/playlitsts/' + $stateParams.id + '/observations')
        })
        .then((response) => {
          $scope.observations = response.data
        })
        .catch((error) => console.log(error))
    }

    $scope.addObservation = (observation) => {
      console.log(observation)
      $http.post(SERVER + '/playlitsts/' + $stateParams.id + '/observations', observation)
        .then((response) => {
          $state.go($state.current, {}, {
            reload: true
          })
        })
        .catch((error) => console.log(error))
    }

    $scope.deleteObservation = (observation) => {
      $http.delete(SERVER + '/playlitsts/' + $stateParams.id + '/observations/' + observation.id)
        .then((response) => {
          $state.go($state.current, {}, {
            reload: true
          })
        })
        .catch((error) => console.log(error))
    }

    $scope.selected = {}

    $scope.getTemplate = (observation) => {
      if (observation.id == $scope.selected.id) {
        return 'edit'
      }
      return 'display'
    }

    $scope.editObservation = (observation) => {
      $scope.selected = angular.copy(observation)
    }

    $scope.cancelEditing = () => {
      $scope.selected = {}
    }

    $scope.saveObservation = (observation) => {
      $http.put(SERVER + '/playlitsts/' + $stateParams.id + '/observations/' + observation.id, observation)
        .then(() => {
          $state.go($state.current, {}, {
            reload: true
          })
        })
        .catch((error) => console.log(error))
    }


    $constructor()
  }])
