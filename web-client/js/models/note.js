StickyNotes.Note = DS.Model.extend({
  noteId: DS.attr('number'),
  body: DS.attr('string'),
  created: DS.attr('date'),
  author: DS.attr('string'),
});

StickyNotes.Note.FIXTURES = [
 {
   noteId: 1,
   body: 'Learn Ember.js',
   created:'12/01/14',
   author: 'Joe Bloggs'
 },
 {
   noteId: 2,
   body: 'Learn Ember.js',
   created:'12/01/14',
   author: 'Joe Bloggs'
 },
 {
   noteId: 3,
   body: 'Learn Ember.js',
   created:'12/01/14',
   author: 'Joe Bloggs'
 }
];

//id bigint
//body text
//created datetime
//author