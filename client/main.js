import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections';
import { Accounts } from 'meteor/accounts-base';

// Accounts config
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});
import './main.html';



Template.body.helpers({
  // notes: [
  //   {text: 'My Note 1'},
  //   {text: 'My Note 2'},
  //   {text: 'My Note 3'}
  // ]
  notes(){
    return Notes.find({});
  }
});

// ADDING IDEAS TO DB
Template.add.events({
  'submit .add-form': function(){
    event.preventDefault();
    // GET INPUT VALUE
    const target = event.target;
    const text = target.text.value;

    // INSERT IDEA INTO COLLECTION
   /* Notes.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    }); */

    Meteor.call('notes.insert', text);

    // CLEAR FORM
    target.text.value = "";
    $('#addModal').modal('close');
    return false;
  }
});

Template.note.events({
  'click .delete-note': function(){
   // Notes.remove(this._id);
   Meteor.call('notes.remove', this);
    return false;
  }
});