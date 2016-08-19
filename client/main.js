import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Resolutions = new Mongo.Collection('resolutions');

Meteor.subscribe('resolutions');

Template.body.helpers({
  resolutions: function(){
  	//retrieves the session variable created below
  	if (Session.get('hideFinished')) {
  		//only returns resolutions that are NOT true
  		return Resolutions.find({checked: {$ne: true}});
  	}else{
  		return Resolutions.find();
  	}  	
  },
  hideFinsihed:function(){
  	return Session.get('hideFinished');
  }
});

Template.body.events({
	'submit .new-resolution': function(event){
		var title = event.target.title.value;
		
		//calls the method for adding a new resolution and passes the title to it
		Meteor.call("addResolution", title);

		event.target.title.value = "";
		return false;
	},

	'change .hide-finished': function(event){
		//when you check the checkbox it will create or set a variable hidefinished and set it to whatever the current
		//state is
		Session.set('hideFinished', event.target.checked);
	}
});

// Template.resolution.helpers({
// 	//checks to see if the current user is the owner
// 	isOwner: function(){
// 		return this.owner === Meteor.userId();
// 	}
// });

// //these are objects so need commas to separate
// Template.resolution.events({
// 	'click .toggle-checked': function(){ 
// 						//update this resolutions setting checked to be the opposite
// 		Meteor.call("updateResolution", this._id, !this.checked)
// 	},
// 	'click .delete': function(){
// 		Meteor.call("deleteResolution", this._id)
// 	},
// 	'click .toggle-private': function(){ 
// 						//update this resolutions setting checked to be the opposite
// 		Meteor.call("setPrivate", this._id, !this.private)
// 	}
// });
//only require username for sign up
Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"	
});



