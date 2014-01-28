StickyNotes.Router.map(function() {
  this.resource('notes', { path: '/' });
});

StickyNotes.NotesRoute = Ember.Route.extend({
  model: function() {

  	var model = {};

  	model.notes = this.store.find('note');

    return model
  }
});