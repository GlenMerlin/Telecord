import { UserModel } from '../models/User'
import https = require("https");

module.exports = {
	name: "register",
	description: "Creates an entry in my database for you (insert the link like: https://t.me/[username])",
	execute(client, interaction,) {
		UserModel.findOne({ name: interaction.user.id }, function(err, users) {
			if (err) return;
			if (users != null) {
				return interaction.reply({ content: "You are already registered in my database,\nif you wish to edit or remove yourself from the database please use the appropate commands (see **/help** for more info)", ephemeral: true });
			}

			let URL = interaction.options.getString('link');
			if (URL.match(/((?:http|https|)\/\/(?:t|telegram)\.me)/gi)) {
				if(!URL.match(/([!#$%^&*()@,?"{}|<>])/gi)){
					// Checks if the link is using https, if not it upgrades the connection to https
					if (!URL.match(/https/gi)) {
						URL = "https" + URL.slice(4);
					}

					// Send HTTP GET request with this URL, and make sure that this is a user
					https.get(URL, (response) => {
						response.on("data", (chunk) => {
							// users that don't exist will always have meta name="robots" and channels will always have button saying "Preview channel"
							if (chunk.toString().includes("robot", "Preview channel")) {
								interaction.reply({ content: "Hmm... I couldn't find any registered telegram users associated with that link, if you're new to telegram sign up at <https://web.telegram.org>", ephemeral: true });
							}
							else {
								const addUserDB = new UserModel({
									name: interaction.user.id,
									link: URL,
								});
								addUserDB.save(function(err, addUserDB) {
									if (err) return console.error(err);
									interaction.reply({ content: "Congrats you registered successfully!", ephemeral: true });
								});
							}
						});
					});
				}
				else {
					return interaction.reply({ content: "Hmm... that telegram link contains invalid characters\nmake sure you typed it correctly", ephemeral: true });
				}
				
			}
			else {
				console.log(err);
				return interaction.reply({ content: "Hmm... that doesn't seem to be a valid telegram link\nmake sure you formatted the command properly (check /help to see proper formatting)", ephemeral: true });
			}
		});
	},
}; 
