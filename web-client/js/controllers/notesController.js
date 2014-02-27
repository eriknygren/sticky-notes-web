notesApp.controller(
    'NotesController', ['$scope', '$http', 'sessionService', 'safeApplyService',
        function($scope, $http, sessionService, safeApplyService)
        {
            $scope.notes = [];
            $scope.boards = [];
            $scope.currentBoardID = null;
            $scope.userID = sessionService.getUserID();
            $scope.canClickTabs = true;

            var sessionToken = sessionService.getSessionToken();
            initiateData();

            function initiateData()
            {
                //change to $http to use the angularjs http service, but it doesn't like CORS at the moment
                // so using jQuery one atm...
                $.ajax({
                    type: 'POST',
                    url: 'http://stickyapi.alanedwardes.com/notes/list',
                    data: {'token': sessionToken },
                    success: function(data) {

                        $scope.notes = data.notes;

                        //Refresh array in view
                        safeApplyService.apply($scope, $scope.notes);
                    },
                    error: errorHandler
                });

                $.ajax({
                    type: 'POST',
                    url: 'http://stickyapi.alanedwardes.com/boards/list',
                    data: {'token': sessionToken },
                    success: function(data) {

                        $scope.boards = data.boards;

                        //Refresh array in view
                        safeApplyService.apply($scope, $scope.boards);
                    },
                    error: errorHandler
                });
            }

            $scope.onAddNoteClicked = function()
            {
                //Push note to db
                $.ajax({
                        type: 'POST',
                        url: 'http://stickyapi.alanedwardes.com/notes/save',
                        data: {'body' : $scope.noteBody,'token': sessionToken, 'boardID': $scope.currentBoardID},
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
            $scope.onEditClicked = function(index, noteBody)
            {
               //console.info(index + " - " + noteBody);

                $scope.editNoteBody = noteBody; 
                $scope.editNoteId = index; 
                
                //$scope.notes[index].body = "noteEdited";
               
            }  
            $scope.onEditSaveClicked = function(editNoteId, editNoteBody)
            {

                //compare editnote to notes[index]
                if(editNoteBody != $scope.notes[editNoteId].body)
                {
                    $scope.notes[editNoteId].body = editNoteBody;
                    


                    //uncomment when server has edit feature
                   /* $.ajax({
                        type: 'POST',
                        url: 'http://stickyapi.alanedwardes.com/notes/edit',
                        data: {'id' : $scope.notes[editNoteId].id, 'title' : '', 'body' : editNoteBody, 'token': sessionToken },
                        success: function(notes) {
                            ;
                        }
                    });
                    */
                    $scope.editNoteBody = $scope.editNoteId = "";
                    
                } 
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

            $scope.tabSelected = function(boardID)
            {
                $scope.currentBoardID = boardID;

                if (boardID == null)
                {
                    return;
                }

                getNotesForBoard(boardID);

            }

            function getNotesForBoard(boardID)
            {
                if (isBoardLoaded(boardID))
                {
                    return;
                }

                for (var i = 0; i < $scope.boards.length; i++)
                {
                    if ($scope.boards[i].id == boardID)
                    {
                        $scope.canClickTabs = false;
                        $.ajax({
                            type: 'POST',
                            url: 'http://stickyapi.alanedwardes.com/notes/list',
                            data: {'token': sessionToken, 'boardID': boardID },
                            success: function(data) {

                                for (var i2 = 0; i2 < data.notes.length; i2++)
                                {
                                    $scope.notes.push(data.notes[i2]);

                                }

                                $scope.canClickTabs = true;

                                //Refresh array in view
                                safeApplyService.apply($scope, $scope.notes);
                                //$scope.boards[i].isLoaded = true;
                            },
                            error: function(data) {
                                $scope.canClickTabs = true;
                                console.log(data);
                            }
                        });
                    }
                }
            }

            function isBoardLoaded(boardID)
            {
                for (var i = 0; i < $scope.notes.length; i++)
                {
                    if ($scope.notes[i].board_id == boardID)
                    {
                        return true;
                    }
                }

                return false;
            }

            function errorHandler(data, status, headers, config)
            {
                console.log(data)
            }
        }]);