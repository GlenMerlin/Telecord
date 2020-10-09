const { UserModel } = require("../models/User.js");
const https = require("https");

module.exports = {
	name: "edit",
	description: "to edit the telegram link associated with your account type `t.edit https://t.me/(username)`",
	execute(client, message, args) {
		UserModel.findOne({ name: message.author.id }, function(err, users) {
			if (err) return;
			if (users != null) {
				try {
					let URL = message.content.slice(7);
					console.log(URL);
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
										message.channel.send("hmm... I couldn't find any registered telegram users associated with that link... make sure you spelled it correctly");
									}
									else {
										UserModel.collection.updateOne(
											{ name: message.author.id },
											{ $set: { link: URL } },
										);
										message.channel.send("Successfully updated your account");
									}
								});
							});
						}
						else {
							message.channel.send(`hmm... that doesn't seem to be a valid telegram link (check **t.help** for more information)`);
						}
					}	
					else {
						message.channel.send(`hmm... that doesn't seem to be a valid telegram link (check **t.help** for more information)`);
					}
				}
				catch (e) {
					console.log(e);
				}
			}
			else {
				message.channel.send("hmm you don't seem to have an account registered... lets fix that, run `t.register [telegram account link]` ");
			}
		});
	},
};
