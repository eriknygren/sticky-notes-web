window.StickyNotes = Ember.Application.create();

StickyNotes.ApplicationAdapter = DS.LSAdapter.extend({
	namespace: 'StickyNotes-emberjs'
});