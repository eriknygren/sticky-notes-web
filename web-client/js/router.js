stickyNotes.Router.map(function() {
  this.resource('stickyNotes', { path: '/' });
});

stickyNotes.NotesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('Note');
  }
});