notesApp.controller(
    'NotesController', ['$scope', '$http', '$modal', 'sessionService', 'safeApplyService',
        function($scope, $http, $modal, sessionService, safeApplyService)
        {
            var NOT_AUTHOR_INFO_MODAL_TITLE = "Can't Edit Note";
            var NOT_AUTHOR_INFO_MODAL_BODY = "You are not the author of this note, and can therefore not edit it.";

            var boardNotes = {

                privateBoard: {},
                sharedBoards: []
            };

            sessionService.getLocalUser(function(user)
            {
                safeApplyService.apply($scope,$scope.user = user);
            });

            $scope.notes = [];
            $scope.boards = [];
            $scope.currentBoardID = null;
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

            var addNoteModalOptions = {
                backdrop: false,
                keyboard: true,
                backdropClick: true,
                templateUrl:  '../modals/addNote.html',
                controller: 'AddNoteController'
            }

            var infoModalOptions = {
                backdrop: true,
                keyboard: true,
                backdropClick: true,
                templateUrl:  '../modals/info.html',
                controller: 'InfoController'
            };

            var userSettingsModalOptions = {
                backdrop: true,
                keyboard: true,
                backdropClick: true,
                templateUrl:  '../modals/editUser.html',
                controller: 'EditUserController'
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
                var addNoteModalInstance = $modal.open(addNoteModalOptions);

                addNoteModalInstance.result.then(function (noteToSave) {

                    //Push note to db
                    $.ajax({
                        type: 'POST',
                        url: 'http://stickyapi.alanedwardes.com/notes/save',
                        data: {'body' : noteToSave.body,'token': sessionToken, 'boardID': $scope.currentBoardID},
                        success: function(note) {
                            console.info("Note posted");

                            //Push Note to array
                            $scope.notes.push(note);
                            safeApplyService.apply($scope, $scope.notes);
                        },
                        error: errorHandler
                    });
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            }

            $scope.onEditClicked = function(index)
            {
                if ($scope.notes[index].author !== $scope.user.id)
                {
                    showInfoModal(NOT_AUTHOR_INFO_MODAL_TITLE, NOT_AUTHOR_INFO_MODAL_BODY);
                    return;
                }

                var previousBody = $scope.notes[index].body;

                editNoteModalOptions.resolve = {
                    note: function()
                    {
                        return $scope.notes[index];
                    }
                }

                var editNoteModalInstance = $modal.open(editNoteModalOptions);

                editNoteModalInstance.result.then(function (note) {

                    // If the user deleted the note in the modal
                    // Otherwise proceed to edit it in the backend
                    if (note.delete)
                    {
                        deleteNote(index);
                        return;
                    }

                    if (previousBody != note.body)
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
                    $scope.notes[index].body = previousBody;
                });
            };

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

            $scope.onUserSettingsClicked = function()
            {
               userSettingsModalOptions.resolve = {
                    user: function() {
                        return $scope.user;
                    }
                }

                $modal.open(userSettingsModalOptions);
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

            function showInfoModal(title, body)
            {
                infoModalOptions.resolve = {
                    title: function()
                    {
                        return title;
                    },
                    content: function()
                    {
                        return body;
                    }
                }

                $modal.open(infoModalOptions);
            }

            function deleteNote(index)
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