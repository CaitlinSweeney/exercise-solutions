
var mainController = function($scope, $timeout){
    $scope.welcome = "Welcome to the fun house."

    // $scope.hovering = false
    $scope.punctuation = '.'
    $scope.goToGoogle = true
    $scope.popup = false
    $scope.editing = false
    $scope.profile = "This is my profile!"
    $scope.bio = {}
    $scope.printedBio = {}
    $scope.toggleEditing = function(event){
        $scope.editing = !$scope.editing
        if ( $scope.editing ) {
            $timeout(function(){
                // probably not the 'angular way', but it's simple, and not problematic in THIS case
                document.querySelector('textarea').focus()
            })

        }
    }


    $scope.clickPopup = function(){
        console.log('hi')
    }
    $scope.write = function(){
        console.log('sup dawg!')
        $scope.punctuation = '!'
        $scope.surprise = true
    }
    $scope.youSure = function(event){
        console.log(event)
        if ( !confirm('really?') ){
            $scope.goToGoogle = false
            event.preventDefault()
        }
    }
    $scope.mouseenter = function(){
        $scope.hovering = true;
    }
    $scope.mouseleave = function(event){
        $scope.hovering = false;
        console.log(event)
    }

    $scope.showPopup = function(){
        $scope.popup = true
    }
    $scope.dismissPopup = function(){
        $scope.popup = false
    }

    $scope.submitForm = function(){
        for ( var key in $scope.bio ){
            $scope.printedBio[key] = $scope.bio[key]
        }
    }
}



angular.module('app', [])
    .controller('mainController', ['$scope', '$timeout', mainController])
