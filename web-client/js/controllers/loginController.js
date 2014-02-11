notesApp.controller(
    'LoginController', ['$scope', '$location',
        function($scope, $location)
        {
            $scope.onLoginClicked = function()
            {
                console.log($scope.username + " " + $scope.password);
                $location.path('/notes');
            }

        }]);