notesApp.controller(
    'EditNoteController', ['$scope', '$modalInstance', 'note',
        function($scope, $modalInstance, note)
        {
            $scope.note = note;

            $scope.cancel = function()
            {
                $modalInstance.dismiss('cancel');
            }

            $scope.save = function()
            {
                $modalInstance.close($scope.note);
            }
        }]);