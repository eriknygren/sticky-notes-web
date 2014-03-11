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
            }

            function showErrorText(text)
            {
                $scope.errorText = text;
                $scope.showErrorText = true;
                $scope.showSuccessText = false;
            }
        }]);