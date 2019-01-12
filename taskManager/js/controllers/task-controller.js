let ctrl = angular.module('taskControllers', ['ui.router'])

const SERVER = 'https://webtechprojectoficial-gherghesan.c9users.io'

ctrl.controller('taskController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    let $constructor = () => {
        $http.get(SERVER + '/tasks')
            .then((response) => {
                $scope.tasks = response.data
            })
            .catch((error) => console.log(error))
    }

    $scope.addTask = (task) => {
        $http.post(SERVER + '/tasks', task)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $scope.deleteTask = (task) => {
        $http.delete(SERVER + '/tasks/' + task.id)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $scope.selected = {}

    $scope.getTemplate = (task) => {
        if (task.id == $scope.selected.id) {
            return 'edit'
        }
        return 'display'
    }

    $scope.editTask = (task) => {
        $scope.selected = angular.copy(task)
    }

    $scope.cancelEditing = () => {
        $scope.selected = {}
    }

    $scope.saveTask = (task) => {
        $http.put(SERVER + '/tasks/' + task.id, task)
            .then(() => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $constructor()

}])
/*
angular.module('loginControllers')
  .controller('taskController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {
    const SERVER = 'https://workspace12-andrafecioru.c9users.io'

    let $constructor = () => {
      $http.get(SERVER + '/login/' + $stateParams.id)
        .then((response) => {
          $scope.task = response.data
          return $http.get(SERVER + '/login/' + $stateParams.id + '/observations')
        })
        .then((response) => {
          $scope.observations = response.data
        })
        .catch((error) => console.log(error))
    }
    
     $scope.addTask = (task) => {
        $http.post(SERVER + '/login/' + $stateParams.id + '/tasks', task)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

$scope.deleteTask = (task) => {
        $http.delete(SERVER + '/login/' + $stateParams.id + '/tasks/' + task.id)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $scope.selected = {}

    $scope.getTemplate = (task) => {
      if (task.id == $scope.selected.id) {
        return 'edit'
      }
      return 'display'
    }

    $scope.editTask = (task) => {
      $scope.selected = angular.copy(task)
    }

    $scope.cancelEditing = () => {
      $scope.selected = {}
    }

 $scope.saveTask = (task) => {
        $http.put(SERVER + '/login/' + $stateParams.id + '/tasks/' + task.id, task)
            .then(() => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $constructor()
  }])
*/
