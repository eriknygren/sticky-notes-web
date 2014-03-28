notesApp.controller(
    'EditUserController', ['$scope', '$modalInstance', 'user', 'safeApplyService', 'sessionService',
        function($scope, $modalInstance, user, safeApplyService, sessionService)
        {
            $scope.showErrorText = false;
            $scope.showSuccessText = false;

            $scope.currentView = 'edit_user';

            $scope.firstName = user.first_name;
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

                        user.first_name = firstName;
                        user.surname = surname;
                        user.email = email;
                        sessionService.setLocalUser(user);
                        showSuccessText('Details successfully updated');
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

            $scope.changePassword = function(oldPassword, password, password2)
            {
                if (!oldPassword || oldPassword === '' ||
                    !password || password === '' ||
                    !password2 || password2 === '')
                {
                    showErrorText('Please fill in all fields');
                    return;
                }

                if (password !== password2)
                {
                    showErrorText('New passwords do not match');
                    return;
                }

                $.ajax({
                    type: 'POST',
                    url: 'http://stickyapi.alanedwardes.com/user/editPassword',
                    data: {'token': sessionService.getSessionToken(), 'password': password,
                        'password2': password2, 'oldPassword': oldPassword},
                    success: function(response) {

                        showSuccessText('Password successfully changed');
                    },
                    error: function(response) {

                        if (typeof response.responseJSON.message !== 'undefined')
                        {
                            showErrorText(response.responseJSON.message);
                        }
                        else
                        {
                            showErrorText('Error changing password');
                        }
                    }
                });
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