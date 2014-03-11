notesApp.controller(
    'EditUserController', ['$scope', '$modalInstance', 'sessionToken', 'userID', 'safeApplyService',
        function($scope, $modalInstance, sessionToken, userID, safeApplyService)
        {
            $scope.isLoading = true;

            $scope.currentView = 'edit_user';

            initiate();

            function initiate()
            {
                $.ajax({
                    type: 'POST',
                    url: 'http://stickyapi.alanedwardes.com/user/getUser',
                    data: {'token': sessionToken, 'id': userID },
                    success: function(user) {

                        $scope.firstName = user.firstName;
                        $scope.surname = user.surname;
                        $scope.email = user.email;
                        safeApplyService.apply($scope);

                        $scope.isLoading = false;
                    },
                    error: function(data) {
                        console.log(data);
                    }
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