notesApp.controller(
    'EditNoteController', ['$scope', '$modal', '$modalInstance', 'note',
        function($scope, $modal, $modalInstance, note)
        {
            $scope.note = note;
            $scope.note.delete = false;

            var deleteNoteConfirmModalOptions = {
                backdrop: true,
                keyboard: true,
                backdropClick: true,
                templateUrl:  '../modals/yesNo.html',
                controller: 'YesNoController',
                resolve: {
                    title: function()
                    {
                        return 'Confirm Delete Note';
                    },
                    content: function()
                    {
                        return 'Are you sure you wanna delete this note?';
                    }
                }
            };

            $scope.cancel = function()
            {
                $modalInstance.dismiss('cancel');
            }

            $scope.save = function()
            {
                $modalInstance.close($scope.note);
            }

            $scope.delete = function()
            {
                var deleteNoteConfirmModalInstance = $modal.open(deleteNoteConfirmModalOptions);

                deleteNoteConfirmModalInstance.result.then(function (isConfirmed) {

                    if (isConfirmed)
                    {
                        $scope.note.delete = true;
                        $modalInstance.close($scope.note);
                    }

                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            }
        }]);