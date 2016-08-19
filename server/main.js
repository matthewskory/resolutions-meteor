import { Meteor } from 'meteor/meteor';

Resolutions = new Mongo.Collection('resolutions');

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish("resolutions", function(){
	//restricts the resolutions it gets to private not equal to true OR owner 
	return Resolutions.find({
		$or: [
		{private: {$ne: true} },
		{owner: this.userId }
		]
	});
})

Meteor.methods({
	addResolution : function(title){
		Resolutions.insert({
			title: title,
			createdAt: new Date(),
			owner: Meteor.userId()
		});
	},
	deleteResolution: function(id){
		var res = Resolutions.findOne(id);

		if(res.owner !== Meteor.userId()){
			throw new Meteor.Error("not authorized");
		}

		Resolutions.remove(id)
	},

	updateResolution: function(id, checked){ 
		var res = Resolutions.findOne(id);

		if(res.owner !== Meteor.userId()){
			throw new Meteor.Error("not authorized");
		}

						//update this resolutions setting checked to be the opposite
		Resolutions.update(id, {$set:{checked: checked}})
	},

	setPrivate: function(id, private){
		var res = Resolutions.findOne(id);

		if(res.owner !== Meteor.userId()){
			throw new Meteor.Error("not authorized");
		}else{
			Resolutions.update(id, {$set:{private: private}})
		}
	}

});