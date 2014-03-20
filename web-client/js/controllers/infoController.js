notesApp.controller('InfoController', ['$scope', '$modalInstance', 'title', 'content',
    function($scope, $modalInstance, title, content)
    {
        $scope.title = title
        $scope.array = [];
        $scope.string = "";
        $scope.displayString = false;
        $scope.displayArray = false;

        // if its an array (known as object for some reason), display entries in ng-repeat in view
        if (typeof content === 'object')
        {
            $scope.array = content;
            $scope.displayArray = true;
        }
        else
        {
            $scope.string = content.toString();
            $scope.displayString = true;
        }

        $scope.ok = function()
        {
            $modalInstance.close();
        }
    }]);
