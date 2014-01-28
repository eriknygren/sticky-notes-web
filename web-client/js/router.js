StickyNotes.Router.map(function() {
  this.resource('notes', { path: '/' });
});

StickyNotes.NotesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('note');
  }
});