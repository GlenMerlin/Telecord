const { UserModel } = require("../models/User.js");
let getTheID = 0;

module.exports = {
	name: "profile",
	description: "to call your profile link use `/profile`, use `/profile @JohnDoe#0000` to see if another user has a telegram account linked with the bot (userIDs/snowflakes are also acceptable)",
	execute(client, interaction ) {
		if (interaction.options.getUser('username') != null){
			getTheID = interaction.options.getUser('username').id;
		}
		else {
			getTheID = interaction.user.id;
		}

		UserModel.findOne({ name: getTheID }, function(err, users) {
			if (err) {
				return (
					interaction.reply({ content: "Sorry Something went wrong, if this continues happening try registering again", ephemeral: true }),
					console.error(err)
				);
			}
			if (users == null) {
				return interaction.reply({ content: "Sorry I couldn't find anything in the database", ephemeral: true });
			}
			interaction.reply(`I found ${users.link} in the database!`);
		});
	},
};
