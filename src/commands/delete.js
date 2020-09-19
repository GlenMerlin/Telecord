const { UserModel } = require("../models/User.js");

module.exports = {
	name: "delete",
	description: "to deregister your account from the database use `t.delete`",
	async execute(client, message, args) {
		UserModel.findOne({ name: message.author.id }, function(err, users) {
			if (err) return;
			if (users != null) {
				const filter = (response) => {
					return message.content;
				};
				try {
					message.channel
						.send(
							"Just to be clear you are trying to delete your account right now, if you proceed your account will be deleted...\nType **t.confirm** to confirm your decision (if you did this by mistake just wait 15 seconds)",
						)
						.then(() => {
							message.channel
								.awaitMessages(filter, {
									max: 1,
									time: 15000,
									errors: ["time"],
								})
								.then((collected) => {
									UserModel.collection.deleteOne({ name: message.author.id });
									message.channel.send(
										`Account deleted successfully, if you change your mind you can always sign up again with **t.register**`,
									);
								})
								.catch((collected) => {
									message.channel.send(
										`Didn't get confirmation within fifteen seconds, your account has been perserved.`,
									);
								});
						});
				}
				catch (e) {
					console.log(e);
				}
			}
			else {
				return message.channel.send(
					"You are not registered in the database, if you want to register see **t.help**",
				);
			}
		});
	},
};
