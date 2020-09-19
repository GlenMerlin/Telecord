const { UserModel } = require("../models/User.js");

module.exports = {
	name: "profile",
	description: "to call your profile link use `t.profile`, use `t.profile @JohnDoe#0000` to see if another user has a telegram account linked with the bot (userIDs are also acceptable)",
	execute(client, message, args) {
		let getTheID = message.author.id;
		if (message.mentions.users.first()) {
			getTheID = message.mentions.users.first();
			getTheID = getTheID.id;
		}
		else if (message.content.length > 10) {
			getTheID = message.content.slice(10).trim();
		}

		UserModel.findOne({ name: getTheID }, function(err, users) {
			if (err) {
				return (
					message.channel.send(
						"Sorry Something went wrong, if this continues happening try registering again",
					),
					console.error(err)
				);
			}
			if (users === null) {
				return message.channel.send(
					"Sorry I couldn't find anything in the database",
				);
			}
			message.channel.send(
				`Hi there ${message.author} I found ${users.link} in the database!`,
			);
		});
	},
};
