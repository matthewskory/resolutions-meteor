

Template.resolution.helpers({
	//checks to see if the current user is the owner
	isOwner: function(){
		return this.owner === Meteor.userId();
	}
});

//these are objects so need commas to separate
Template.resolution.events({
	'click .toggle-checked': function(){ 
						//update this resolutions setting checked to be the opposite
		Meteor.call("updateResolution", this._id, !this.checked)
	},
	'click .delete': function(){
		Meteor.call("deleteResolution", this._id)
	},
	'click .toggle-private': function(){ 
						//update this resolutions setting checked to be the opposite
		Meteor.call("setPrivate", this._id, !this.private)
	}
});