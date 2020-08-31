module.exports = {
	name: "edit",
	description: "This command lets users edit the link stored in the bot's DB",
	execute(message, UsersDB) {
		UsersDB.findOne({ name: message.author.id }, function(err, users){
			if (err) return;
			if (users != null) {
				try {
					if (message.content.slice(7).match(/((?:http|https|)\/\/(?:t|telegram)\.me)/gi)) {
						UsersDB.collection.updateOne(
							{ name: message.author.id },
							{ $set: { link: message.content.slice(7).trim() } },
						);
						console.log(message.author.id);
						console.log(message.content.slice(7).trim());
						message.channel.send('Successfully updated your account');
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
				message.channel.send("hmm you don't seem to have an account... lets fix that, run `t.register [telegram account link]` ");
			}
		});
	},
};