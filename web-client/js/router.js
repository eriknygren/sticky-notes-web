StickyNotes.Router.map(function() {
  this.resource('notes', { path: '/' }, function() {   
    this.route('active');
  });
  this.route('active');
});

StickyNotes.NotesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('note');
  }
});

StickyNotes.NotesIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('StickyNotes');
  }
});
StickyNotes.NotesActiveRoute = Ember.Route.extend({
  model: function(){
    return this.store.filter('note', function(note) {
      return !note.get('isCompleted');
    });
  },
  renderTemplate: function(controller) {
    this.render('StickyNotes/index', {controller: controller});
  }
});