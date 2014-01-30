StickyNotes.NotesController = Ember.ArrayController.extend({
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
  },
  
  remaining: function(){
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function(){
    var remaining = this.get('remaining');
    return remaining === 1 ? 'note' : 'notes';
  }.property('remaining'),
});