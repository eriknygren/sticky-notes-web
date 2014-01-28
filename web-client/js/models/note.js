stickyNotes.Note = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

stickyNotes.Note.FIXTURES = [
 {
   id: 1,
   title: 'Learn Ember.js',
   isCompleted: true
 },
 {
   id: 2,
   title: '...',
   isCompleted: false
 },
 {
   id: 3,
   title: 'Profit!',
   isCompleted: false
 }
];