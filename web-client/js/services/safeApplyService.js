// AngularJS doesn't like if you call $scope.apply() when it's already applying
// So instead of checking every time we call apply(), this will make sure it's not throwing any errors
notesApp.factory('safeApplyService', function()
{
    var safeApplyService = {};

    safeApplyService.apply = function(scope, fn)
    {
        var phase = scope.$root.$$phase;
        if (phase == '$apply' || phase == '$digest')
        {
            if (fn)
            {
                scope.$eval(fn);
            }
        }
        else
        {
            if (fn)
            {
                scope.$apply(fn);
            }
            else
            {
                scope.$apply();
            }
        }
    }

    return safeApplyService;
});