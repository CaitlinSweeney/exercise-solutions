
var mainController = function($scope){
    console.log('controller is up')
    $scope.addingANote = false
    $scope.clickSpot = [0,0]
    $scope.markers = []
    $scope.noteInput = ''

    $scope.addMarker = function(event){
        $scope.clickSpot = {
            x : event.pageX / document.body.clientWidth * 100,
            y : event.pageY / document.body.clientHeight * 100
        }
        $scope.markers.push($scope.clickSpot)
        $scope.addingANote = true
    }
    $scope.addNote = function(){
        $scope.markers[$scope.markers.length -1].note = $scope.noteInput
        $scope.addingANote = false
        $scope.noteInput = ''
    }

    $scope.removeMarker = function(index){
        $scope.markers.splice(index, 1)
    }
}




angular.module('app', [])
    .controller('mainController', ['$scope', mainController])