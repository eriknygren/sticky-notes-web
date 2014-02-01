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
    },
    clearCompleted: function() {
      var completed = this.filterBy('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    },
  },

  hasCompleted: function() {
  return this.get('completed') > 0;
  }.property('completed'),

  completed: function() {
  return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted'),
  
  isEditing: false,

  remaining: function(){
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function(){
    var remaining = this.get('remaining');
    return remaining === 1 ? 'note' : 'notes';
  }.property('remaining'),

  allAreDone: function(key, value) {
  if (value === undefined) {
    return !!this.get('length') && this.everyProperty('isCompleted', true);
  } else {
    this.setEach('isCompleted', value);
    this.invoke('save');
    return value;
  }
  }.property('@each.isCompleted')
});


