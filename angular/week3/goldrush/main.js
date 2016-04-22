
var mainController = function($scope){
    console.log('controller is up')
    $scope.addingANote = false
    $scope.whichNote = 0
    $scope.clickSpot = [0,0]
    $scope.markers = []
    $scope.addMarker = function(event){
        // console.log(event.pageY)
        // console.log(event.pageX)
        $scope.addingANote = true
        $scope.clickSpot = {
            x : event.pageX / document.body.clientWidth * 100,
            y : event.pageY / document.body.clientHeight * 100
        }
        $scope.markers.push($scope.clickSpot)
        console.log($scope.clickSpot)
        $scope.whichNote = $scope.markers.length -1
    }
    $scope.addNote = function(){
        $scope.markers[$scope.whichNote].note = $scope.noteInput
        $scope.addingANote = false
        $scope.noteInput = ''
        console.log($scope.markers)
    }

    $scope.removeMarker = function(index){
        console.log(index)
        $scope.markers.splice(index, 1)
    }
}




angular.module('app', [])
    .controller('mainController', ['$scope', mainController])