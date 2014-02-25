var notesApp = angular.module('notesApp', ['ngRoute', 'ui.bootstrap']);

notesApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider )
    {


        $locationProvider.html5Mode(true);

        $routeProvider.when('/', { templateUrl: '/partials/login.html'});
        $routeProvider.when('/notes', { templateUrl: '/partials/notes.html'});
        $routeProvider.otherwise({ redirectTo: '/' });
        //$routeProvider.otherwise({ templateUrl: '/partials/login' });

    }]);