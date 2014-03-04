notesApp.controller(
    'NotesController', ['$scope', '$http', '$modal', 'sessionService', 'safeApplyService',
        function($scope, $http, $modal, sessionService, safeApplyService)
        {
            var boardNotes = {

                privateBoard: {},
                sharedBoards: []
            };


            $scope.notes = [];
            $scope.boards = [];
            $scope.currentBoardID = null;
            $scope.userID = sessionService.getUserID();
            $scope.canClickTabs = true;

            var sessionToken = sessionService.getSessionToken();
            initiateData();

            var editNoteModalOptions = {
                backdrop: false,
                keyboard: true,
                backdropClick: true,
                templateUrl:  '../modals/editNote.html',
                controller: 'EditNoteController'
            }

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
                        boardNotes.privateBoard.notes = data.notes;

                        showNotesInView(data.notes);
                    },
                    error: errorHandler
                });

                $.ajax({
                    type: 'POST',
                    url: 'http://stickyapi.alanedwardes.com/boards/list',
                    data: {'token': sessionToken },
                    success: function(data) {

                        $scope.boards = data.boards;
                        boardNotes.sharedBoards = data.boards;

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
                $scope.editNoteBody = noteBody; 
                $scope.editNoteId = index;

                var previousBody = $scope.notes[index].body;

                editNoteModalOptions.resolve = {
                    note: function()
                    {
                        return $scope.notes[index];
                    }
                }

                var editNoteModalInstance = $modal.open(editNoteModalOptions);

                editNoteModalInstance.result.then(function (note) {

                    if(previousBody != note.body)
                    {
                        $.ajax({
                            type: 'POST',
                            url: 'http://stickyapi.alanedwardes.com/notes/edit',
                            data: {'id' : note.id, 'title' : '', 'body' : note.body, 'token': sessionToken },
                            success: function(notes) {

                                console.log('Note edited');
                            }
                        });
                    }

                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };

            $scope.onDeleteClicked = function(index)
            {
                var deleteNoteConfirmModalInstance = $modal.open(deleteNoteConfirmModalOptions);

                deleteNoteConfirmModalInstance.result.then(function (isConfirmed) {

                   if (isConfirmed)
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

                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            }

            $scope.tabSelected = function(boardID)
            {
                if (boardID != "newBoard")
                {
                    $scope.currentBoardID = boardID;

                    if (boardID == null)
                    {
                        showNotesInView(boardNotes.privateBoard.notes);
                        return;
                    }
                    getNotesForBoard(boardID);

                }
                else
                {
                    console.info("newBoard");
                    showNotesInView(boardNotes.privateBoard.notes);
                    return;
                }

                

            }

            function getNotesForBoard(boardID)
            {
                for (var i = 0; i < boardNotes.sharedBoards.length; i++)
                {
                    if (boardNotes.sharedBoards[i].id == boardID)
                    {
                        if (typeof boardNotes.sharedBoards[i].isLoaded !== 'undefined')
                        {
                            if (boardNotes.sharedBoards[i].isLoaded)
                            {
                                // This board is already loaded, display the cached notes in the view
                                showNotesInView(boardNotes.sharedBoards[i].notes);
                                return;
                            }
                        }
                        // if the code hasn't triggered a return, proceed and get notes from  the server below
                        break;
                    }
                }

                $scope.canClickTabs = false;
                console.log('Getting notes for board ' + boardID);
                $.ajax({
                    type: 'POST',
                    url: 'http://stickyapi.alanedwardes.com/notes/list',
                    data: {'token': sessionToken, 'boardID': boardID },
                    success: function(data) {

                        $scope.canClickTabs = true;
                        boardNotes.sharedBoards[i].isLoaded = true;
                        boardNotes.sharedBoards[i].notes = data.notes;

                        showNotesInView(data.notes);
                    },
                    error: function(data) {
                        $scope.canClickTabs = true;
                        console.log(data);
                    }
                });
            }

            function showNotesInView(notes)
            {
                $scope.notes = notes;
                //Refresh array in view
                safeApplyService.apply($scope, $scope.notes);
            }

            function errorHandler(data, status, headers, config)
            {
                console.log(data)
            }
        }]);