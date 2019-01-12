angular.module('taskControllers')
  .controller('taskDetailsController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {
    const SERVER = 'https://webtechprojectoficial-gherghesan.c9users.io' 

    let $constructor = () => {
      $http.get(SERVER + '/tasks/' + $stateParams.id)
        .then((response) => {
          $scope.task = response.data
          return $http.get(SERVER + '/tasks/' + $stateParams.id + '/observations')
        })
        .then((response) => {
          $scope.observations = response.data
        })
        .catch((error) => console.log(error))
    }

    $scope.addObservation = (observation) => {
      console.log(observation)
      $http.post(SERVER + '/tasks/' + $stateParams.id + '/observations', observation)
        .then((response) => {
          $state.go($state.current, {}, {
            reload: true
          })
        })
        .catch((error) => console.log(error))
    }

    $scope.deleteObservation = (observation) => {
      $http.delete(SERVER + '/tasks/' + $stateParams.id + '/observations/' + observation.id)
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
      $http.put(SERVER + '/tasks/' + $stateParams.id + '/observations/' + observation.id, observation)
        .then(() => {
          $state.go($state.current, {}, {
            reload: true
          })
        })
        .catch((error) => console.log(error))
    }


    $constructor()
  }])
