notesApp.controller(
    'LoginController', ['$scope', '$location', 'sessionService',
        function($scope, $location, sessionService)
        {
            // Hardcoding these values because it's boring to type
            $scope.username = "test@example.com";
            $scope.password = "password";

            $scope.onLoginClicked = function()
            {
                console.log($scope.username + " " + $scope.password);

                $.ajax({
                    type: 'POST',
                    url: 'http://stickyapi.alanedwardes.com/user/login',
                    data: {'username': $scope.username, 'password': $scope.password },
                    success: function(response) {

                        sessionService.setSessionToken(response.session.id);
                        sessionService.setLocalUser(response.user);

                        $location.path('/notes');

                        if(!$scope.$$phase)
                        {
                            $scope.$apply()
                        }
                    },
                    error: function(data, status, headers, config) {
                        console.log(data);
                    }
                });
            }

        }]);