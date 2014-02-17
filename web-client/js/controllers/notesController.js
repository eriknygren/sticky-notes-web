notesApp.controller(
    'NotesController', ['$scope', '$http',
        function($scope, $http)
        {
            $scope.notes = [];

            var sessionToken = "";

            var loginData =
            {
                username: "test@example.com",
                password: "password"
            }

            var sessionToken = "";
            //change to $http to use the angularjs http service, but it doesn't like CORS at the moment
            // so using jQuery one atm...
            // login and get notes
            $.ajax({
                type: 'POST',
                url: 'http://stickyapi.alanedwardes.com/user/login',
                data: {'username': loginData.username, 'password': loginData.password },
                success: function(response) {
                    sessionToken = response.session.id;
                    
                    $.ajax({
                        type: 'POST',
                        url: 'http://stickyapi.alanedwardes.com/notes/list',
                        data: {'token': sessionToken },
                        success: function(notes) {
                            
                            $scope.notes = notes;

                            //Refresh array in view
                             $scope.$apply(function () {
                                $scope.notes = notes;
                            });
                        }
                    });
                }
            });

            $scope.greeting = 'Hola!';

            function errorHandler(data, status, headers, config)
            {
                console.log(data)
            }

            $scope.onAddNoteClicked = function()
            {
                //Create Note
                $scope.newNote = {'author' : '1','body' : $scope.noteBody, 'created' : Date(), 'id' : 21 }; 
                //Push Note to array
                $scope.notes.push($scope.newNote);
                //Push note to db
                $.ajax({
                        type: 'POST',
                        url: 'http://stickyapi.alanedwardes.com/notes/save',
                        data: {'body' : $scope.newNote.body,'token': sessionToken },
                        success: function(notes) {
                            console.info("NotePosted");
                        }
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
                        }
                });

                //Remove note from notes
                $scope.notes.splice(index,1);
            }    
        }]);