StickyNotes.NoteController = Ember.ObjectController.extend({
	/*isCompleted: function(key, value){
		var model = this.get('model');
 	if (value === undefined) {
      // property being used as a getter
      return model.get('isCompleted');
    } else {
      // property being used as a setter
      model.set('isCompleted', value);
      model.save();
      return value;
    }
	}.property('model.isCompleted'),*/
  actions: {
   editNote: function() {
     this.set('isEditing', true);
   },
    acceptChanges: function() {
    this.set('isEditing', false);

    if (Ember.isEmpty(this.get('model.body'))) {
      this.send('removeNote');
    } else {
      this.get('model').save();
    }
  },
   removeNote: function() {
    var note = this.get('model');
    note.deleteRecord();
    note.save();
  },
 },

isEditing: false,
});