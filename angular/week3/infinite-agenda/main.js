
var mainController = function($scope, $interval){
    var today = new Date()
    today.tasks = []
    $scope.days = [today]
    $scope.whichDay = today
    $scope.addingATask = false

    $scope.addDays = function(numDays){
        var n = numDays || 1
        for ( var i = 0; i < n; i++ ) {
            var lastDay = $scope.days[$scope.days.length-1]
            var newDay = new Date(lastDay)
            newDay.tasks = []
            newDay.setDate(newDay.getDate()+1)
            $scope.days.push(newDay)
        }
    }
    $scope.addDays(6)

    $scope.addTask = function(index){
        console.log(index)
        $scope.addingATask = true
        $scope.whichDay = $scope.days[index]
        console.log($scope.whichDay.tasks)
        console.log($scope.days[index].tasks)

    }

    $scope.submitTask = function(){
        console.log('submit task!')
        console.log($scope.whichDay.tasks)
        $scope.whichDay.tasks.push({
            name        : $scope.newTaskName,
            description : $scope.newTaskDescription,
            editing     : false,
        })
        $scope.addingATask = false
        $scope.newTaskName = ''
        $scope.newTaskDescription = ''
    }

    $scope.stopProp = function(event){
        event.stopPropagation()
    }
    $scope.toggleEditing = function(task){
        console.log('toggle')
        task.editing = !task.editing
    }

    $interval(function(){
        if ( document.body.scrollTop + window.innerHeight === document.body.scrollHeight ) {
            $scope.addDays()
        }
    }, 1000)
}




angular.module('app', [])
    .controller('mainController', ['$scope', '$interval', mainController])