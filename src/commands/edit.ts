import { UserModel } from '../models/User'
const https = require("https");

module.exports = {
	name: "edit",
	description: "Edit the Telegram link associated with your account using `/edit https://t.me/(username)`",
	execute(client, interaction ) {
		UserModel.findOne({ name: interaction.user.id }, function(err, users) {
			if (err) return;
			if (users != null) {
				try {
					let URL = interaction.options.getString('link');
					if (URL.match(/((?:http|https|)\/\/(?:t|telegram)\.me)/gi)) {
						if (!URL.match(/([!#$%^&*(),;?"{}<>])/gi)){
							// Checks if the link is using https, if not it upgrades the connection to https
							if (!URL.match(/https/gi)) {
								URL = "https" + URL.slice(4);
							}

							https.get(URL, (response) => {
								response.on("data", (chunk) => {
								// users that don't exist will always have meta name="robots" and channels will always have button saying "Preview channel"
									if (chunk.toString().includes("robots", "Preview channel")) {
										interaction.reply({ content: "Hmm... I couldn't find any registered telegram users associated with that link... make sure you spelled it correctly", ephemeral: true });
									}
									else {
										UserModel.collection.updateOne(
											{ name: interaction.user.id },
											{ $set: { link: URL } },
										);
										interaction.reply({ content: "Successfully updated your account", ephemeral: true });
									}
								});
							});
						}
						else {
							interaction.reply({ content: "Hmm... that isn't a valid telegram link because it contains invalid characters\nmake sure you typed it correctly", ephemeral: true });
						}
					}	
					else {
						interaction.reply({ content: `Hmm... that doesn't seem to be a valid telegram link (check **/help** for more information)`, ephemeral: true });
					}
				}
				catch (e) {
					console.log(e);
				}
			}
			else {
				interaction.reply({ content: "Hmm you don't seem to have an account registered... lets fix that, run `/register [telegram account link]` ", ephemeral: true });
			}
		});
	},
};
