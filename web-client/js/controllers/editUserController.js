notesApp.controller(
    'EditUserController', ['$scope', '$modalInstance', 'safeApplyService', 'sessionService',
        function($scope, $modalInstance, safeApplyService, sessionService)
        {
            $scope.isLoading = true;

            $scope.currentView = 'edit_user';

            initiate();

            function initiate()
            {
                sessionService.getLocalUser(function(user)
                {
                    $scope.firstName = user.firstName;
                    $scope.surname = user.surname;
                    $scope.email = user.email;
                    safeApplyService.apply($scope);

                    $scope.isLoading = false;
                });
            }


            $scope.saveUserDetails = function()
            {

            }

            $scope.changePassword = function()
            {

            }

            $scope.close = function()
            {
                $modalInstance.close();
            }
        }]);