notesApp.controller(
    'AddNoteController', ['$scope', '$modalInstance',
        function($scope, $modalInstance)
        {
            $scope.note = {
                title: "",
                body: ""
            };

            $scope.cancel = function()
            {
                $modalInstance.dismiss('cancel');
            }

            $scope.save = function()
            {
                $modalInstance.close($scope.note);
            }
        }]);