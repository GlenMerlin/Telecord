module.exports = {
	name: "profile",
	description: "this command sends out a request to the database to find a user's profile",
	execute(message, UsersDB) {
		let getTheID = message.author.id;
		if (message.mentions.users.first()) {
			getTheID = message.mentions.users.first();
			getTheID = getTheID.id;
		}
		else if(message.content.length > 10){
			getTheID = message.content.slice(10).trim();
		}

		UsersDB.findOne({ name: getTheID }, function(err, users){
			if (err) return message.channel.send('Sorry Something went wrong, if this continues happening try registering again'), console.error(err);
			if (users === null) {
				return message.channel.send("Sorry I couldn't find anything in the database");
			}
			message.channel.send(`Hi there ${message.author} I found ${users.link} in the database!`);
					
		});
	},
};