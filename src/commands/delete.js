const { UserModel } = require("../models/User.js");

module.exports = {
	name: "delete",
	description: "to deregister your account from the database use `t.delete`",
	async execute(client, interaction) {
		UserModel.findOne({ name: interaction.member.user.id }, function(err, users) {
			if (err) return;
			if (users != null) {
				try {
					UserModel.collection.deleteOne({ name: interaction.member.user.id });

					client.api.interactions(interaction.id, interaction.token).callback.post({ data: {
						type: 4,
						data: {
							content: 'Account deleted successfully, if you change your mind you can always sign up again with **t.register**',
						},
					} });
				}
				catch (e) {
					console.log(e);
				}
			}
			else {
				return client.api.interactions(interaction.id, interaction.token).callback.post({ data: {
					type: 4,
					data: {
						content: "You are not registered in the database, if you want to register see **t.help**",
					},
				} });
			}
		});
	},
};
