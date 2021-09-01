const { UserModel } = require("../models/User.js");

module.exports = {
	name: "delete",
	description: "to deregister your account from the database use `/delete`",
	async execute(client, interaction) {
		UserModel.findOne({ name: interaction.user.id }, function(err, users) {
			if (err) return;
			if (users != null) {
				try {
					UserModel.collection.deleteOne({ name: interaction.member.user.id });

					interaction.reply({ content: "Account deleted successfully, if you change your mind you can always sign up again with /register", ephemeral: true });
				}
				catch (e) {
					console.log(e);
				}
			}
			else {
				interaction.reply({ content: "You are not registered in the database, if you want to register use /register", ephemeral: true });
			}
		});
	},
};
