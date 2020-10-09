const { UserModel } = require("../models/User.js");
const https = require("https");

module.exports = {
	name: "register",
	description: "to set up your account use `t.register https://t.me/(username)`",
	execute(client, message, args) {
		UserModel.findOne({ name: message.author.id }, function(err, users) {
			if (err) return;
			if (users != null) {
				return message.channel.send("You are already registered in my database,\nif you wish to edit or remove yourself from the database please use the appropate commands (see **t.help** for more info)");
			}
			let URL = message.content.slice(11);
			if (URL.match(/((?:http|https|)\/\/(?:t|telegram)\.me)/gi)) {
				if(!URL.match(/([!#$%^&*(),?"{}|<>])/gi)){
					// Checks if the link is using https, if not it upgrades the connection to https
					if (!URL.match(/https/gi)) {
						URL = "https" + URL.slice(4);
					}	
					// Send HTTP GET request with this URL, and make sure that this is a user
					https.get(URL, (response) => {
						response.on("data", (chunk) => {
						// users that don't exist will always have meta name="robots" and channels will always have button saying "Preview channel"
							if (chunk.toString().includes("robots", "Preview channel")) {
								message.channel.send("hmm... I couldn't find any registered telegram users associated with that link, if you're new to telegram sign up at <https://web.telegram.org>");
							}
							else {
								const addUserDB = new UserModel({
									name: message.author.id,
									link: URL,
								});
								addUserDB.save(function(err, addUserDB) {
									if (err) return console.error(err);
									message.channel.send("Congrats you registered successfully");
								});
							}
						});
					});
				}
				
			}
			else {
				console.log(err);
				return message.channel.send("hmm... that doesn't seem to be a valid telegram link\nmake sure you formatted the command properly (check t.help to see proper formatting)");
			}
		});
	},
}; 
