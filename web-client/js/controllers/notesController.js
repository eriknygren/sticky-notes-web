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
                data: {'username': 'test@example.com', 'password': 'password' },
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
                //Clear Note TextBox
                $scope.noteBody = "";
            }
            $scope.onDeleteClicked = function()
            {
               console.info("delete");
            }
            
        }]);