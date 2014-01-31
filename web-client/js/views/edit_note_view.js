StickyNotes.EditNoteView = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});

Ember.Handlebars.helper('edit-note', StickyNotes.EditNoteView);