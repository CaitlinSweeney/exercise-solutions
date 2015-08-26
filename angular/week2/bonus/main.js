
var mainController = function($scope, $window, $interval){
    $scope.getStats = function(){
        if ( !$scope.paused ){

            console.log('innerHeight', $window.innerHeight) // height of the window
            console.log('current scroll', document.body.scrollTop) // how far we've scrolled
            console.log('body height', document.body.scrollHeight) // total height of the body
            console.log('window height + scrollheight', $window.innerHeight + document.body.scrollTop) 
        }
    }
    // $interval($scope.getStats, 1000)

    $scope.cats = [
        'https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg',
        'http://www.saveourcatsandkittens.com/images/home-cat.jpg',
        'https://sociorocketnewsen.files.wordpress.com/2013/07/bullet_cat1.jpg?w=580&h=403',
    ]

    $scope.whichPic = $scope.cats[0]
    $scope.whichPicIndex = 0
    $interval(function(){
        $scope.whichPic = $scope.cats[$scope.whichPicIndex++ % $scope.cats.length]
    }, 1500)
}

angular.module('app', [])
    .controller('mainController', ['$scope', '$window', '$interval', mainController])
