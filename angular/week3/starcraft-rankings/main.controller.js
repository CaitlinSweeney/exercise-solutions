var MainController = function($scope, DataFactory){
    $scope.data = DataFactory
    $scope.page = 1
    $scope.perPage = 15
    $scope.asc = false
    $scope.totalPages = Math.ceil($scope.data.data.length / $scope.PerPage)
    console.log($scope.data)
    console.log($scope.data.data.length / 15)
    $scope.raceFilter = null
    $scope.sortOrder = '0'

    $scope.changePage = function(n){
        $scope.page += n
        console.log($scope.page)
    }
    $scope.sortDataBy = function(col){
        console.log(col, $scope.sortOrder)
        if ( col.toString() === $scope.sortOrder ) {
            $scope.asc = !$scope.asc
        }
        else { $scope.asc = false }
        $scope.sortOrder = col.toString()
    }

    $scope.filterByRace = function(val){
        if ( !$scope.raceFilter ) {
            return true
        }
        return val[3] === $scope.raceFilter
    }
}


angular.module('app')
    .controller('MainController', ['$scope', 'DataFactory', MainController])
