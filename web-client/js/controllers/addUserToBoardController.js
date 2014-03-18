notesApp.controller(
    'AddUserToBoardController', ['$scope', '$modalInstance', 'user', 'boardID', 'safeApplyService', 'sessionService',
        function($scope, $modalInstance, user, boardID, safeApplyService, sessionService)
        {
            $scope.showErrorText = false;
            $scope.showSuccessText = false;

            $scope.email = "";

            $scope.onAddUserClicked = function(email)
            {
                if (!email || email === '')
                {
                    showErrorText('Please fill in all fields');
                    return;
                }

                $.ajax({
                    type: 'POST',
                    url: 'http://stickyapi.alanedwardes.com/board/addUser',
                    data: {'token': sessionService.getSessionToken(), 'boardID': boardID,
                        'email': email},
                    success: function(response) {


                        showSuccessText(email + ' has been successfully added to the board.');
                    },
                    error: function(response) {

                        if (typeof response.responseJSON.message !== 'undefined')
                        {
                            showErrorText(response.responseJSON.message);
                        }
                        else
                        {
                            showErrorText('Error adding user to board');
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