notesApp.controller('YesNoController', ['$scope', '$modalInstance', 'title', 'content',
    function($scope, $modalInstance, title, content)
    {
        $scope.title = title
        $scope.content = content;

        $scope.confirm = function()
        {
            $modalInstance.close(true);
        }

        $scope.cancel = function()
        {
            $modalInstance.close(false);
        }
    }]);
