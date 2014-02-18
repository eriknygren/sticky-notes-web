notesApp.controller(
    'NotesController', ['$scope', '$http', 'sessionService', 'safeApplyService',
        function($scope, $http, sessionService, safeApplyService)
        {
            $scope.notes = [];

            var sessionToken = sessionService.getSessionToken();

            //change to $http to use the angularjs http service, but it doesn't like CORS at the moment
            // so using jQuery one atm...
                    
            $.ajax({
                type: 'POST',
                url: 'http://stickyapi.alanedwardes.com/notes/list',
                data: {'token': sessionToken },
                success: function(notes) {

                    $scope.notes = notes;

                    //Refresh array in view
                    safeApplyService.apply($scope, $scope.notes);
                },
                error: errorHandler
            });



            $scope.onAddNoteClicked = function()
            {
                //Push note to db
                $.ajax({
                        type: 'POST',
                        url: 'http://stickyapi.alanedwardes.com/notes/save',
                        data: {'body' : $scope.noteBody,'token': sessionToken },
                        success: function(note) {
                            console.info("Note posted");

                            //Push Note to array
                            $scope.notes.push(note);
                            safeApplyService.apply($scope, $scope.notes);
                        },
                        error: errorHandler
                });
                //Clear Note TextBox
                $scope.noteBody = "";
            }
            $scope.onDeleteClicked = function(index)
            {
               
                //Remove note from db
                $.ajax({
                        type: 'POST',
                        url: 'http://stickyapi.alanedwardes.com/notes/delete',
                        data: {'id' : $scope.notes[index].id,'token': sessionToken },
                        success: function(notes) {
                            console.info("Note : "+ $scope.notes[index].id + " - Delete");

                            //Remove note from notes
                            $scope.notes.splice(index,1);
                            safeApplyService.apply($scope, $scope.notes);
                        },
                        error: errorHandler

                });
            }

            function errorHandler(data, status, headers, config)
            {
                console.log(data)
            }
        }]);