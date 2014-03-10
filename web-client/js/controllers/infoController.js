notesApp.controller('InfoController', ['$scope', '$modalInstance', 'title', 'content',
    function($scope, $modalInstance, title, content)
    {
        $scope.title = title
        $scope.content = content;

        $scope.ok = function()
        {
            $modalInstance.close();
        }
    }]);
