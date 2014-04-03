notesApp.controller(
    'LoginController', ['$scope', '$location', 'sessionService',
        function($scope, $location,sessionService)
        {
            // Hardcoding these values because it's boring to type
            $scope.username = "test@example.com";
            $scope.password = "password";

            $scope.isRegisterCollapsed = true;
            $scope.isDisabled = true;

            var first = last = email = password = terms = false
            var pass1 = "1";
            var pass2 = "2";

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
            $scope.onChange = function(field, val)
            {
                 if(field == "first" &&  val !="")
                {
                    first = true;
                }
                 if(field == "last" &&  val !="")
                {
                    last = true;
                }
                if(field == "email" &&  val !="")
                {
                    email = true;
                }
                else if(field == "pwd1" &&  val !="")
                {
                    pass1 = val;
                }
                else if(field == "pwd2" &&  val !="")
                {
                    pass2 = val;
                }
                if(pass1 == pass2)
                {
                    password = true;
                }
                else{password = false;}
                if(field == "checkbox" && val == true)
                {
                    terms = true;
                }
                if (first && last && email && password && terms)
                {
                    $scope.isDisabled = false;
                }
                else{$scope.isDisabled = true;}
            }
            $scope.onRegisterClicked = function(first, surname, email, password)
            {
               $.ajax({
                    type: 'POST',
                    url: 'http://stickyapi.alanedwardes.com/user/register',
                    data: {'token': sessionService.getSessionToken(), 'firstName': first,
                    'surname': surname, 'password': password,'email': email},
                    success: function(response) {

                       
                    },
                    error: function(response) {

                        if (typeof response.responseJSON.message !== 'undefined')
                        {
                            showErrorText(response.responseJSON.message);
                        }
                        else
                        {
                            showErrorText('Error updating user details');
                        }
                    }
                });
            }

            $scope.onHide = function()
            { 
                $scope.isLoginCollapsed = !$scope.isLoginCollapsed ;
                $scope.isRegisterCollapsed = !$scope.isRegisterCollapsed;
            }

        
        }]);