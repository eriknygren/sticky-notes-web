StickyNotes.NotesController = Ember.ObjectController.extend({
  actions: {
    createNote: function() {
      // Get the note title set by the "New note" text field
      var newNoteText = this.get('newNoteText');
      if (!newNoteText.trim()) { return; }

      // Create the new Note model
      var note = this.store.createRecord('note', {
        title: newNoteText,
        isCompleted: false
      });

      // Clear the input text field
      this.set('newNoteText', '');

      // Save the new model
      note.save();
    }
  }
});