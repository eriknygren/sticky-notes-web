notesApp.controller(
    'EditUserController', ['$scope', '$modalInstance', 'user', 'safeApplyService', 'sessionService',
        function($scope, $modalInstance, user, safeApplyService, sessionService)
        {
            $scope.showErrorText = false;
            $scope.showSuccessText = false;

            $scope.currentView = 'edit_user';

            $scope.firstName = user.firstName;
            $scope.surname = user.surname;
            $scope.email = user.email;

            $scope.saveUserDetails = function(firstName, surname, email)
            {
                if (!email || email === '' ||
                    !surname || surname === '' ||
                    !firstName || firstName === '')
                {
                    showErrorText('Please fill in all fields');
                    return;
                }

                $.ajax({
                    type: 'POST',
                    url: 'http://stickyapi.alanedwardes.com/user/editDetails',
                    data: {'token': sessionService.getSessionToken(), 'firstName': firstName,
                    'surname': surname, 'email': email},
                    success: function(response) {

                        user.firstName = firstName;
                        user.surname = surname;
                        user.email = email;
                        sessionService.setLocalUser(user);
                        showSuccessText('Details successfully updated');
                    },
                    error: function(response) {
                        showErrorText(response.responseJSON.message);
                    }

                });
            }

            $scope.changePassword = function(oldPassword, password, password2)
            {
                if (!oldPassword || oldPassword === '' ||
                    !password || password === '' ||
                    !password2 || password2 === '')
                {
                    showErrorText('Please fill in all fields');
                    return;
                }
            }

            $scope.close = function()
            {
                $modalInstance.close();
            }

            function showSuccessText(text)
            {
                $scope.successText = text;
                $scope.showSuccessText = true;
                $scope.showErrorText = false;
                safeApplyService.apply($scope);
            }

            function showErrorText(text)
            {
                $scope.errorText = text;
                $scope.showErrorText = true;
                $scope.showSuccessText = false;
                safeApplyService.apply($scope);
            }
        }]);