notesApp.controller(
    'AddBoardController', ['$scope', '$modalInstance',
        function($scope, $modalInstance)
        {
            $scope.board =
            {
                name: ""
            };

            $scope.cancel = function()
            {
                $modalInstance.dismiss('cancel');
            }

            $scope.save = function()
            {
                $modalInstance.close($scope.board);
            }
        }]);