module.exports = {
	name: "register",
	description: "this command lets users register with the bot so that it can store their telegram link",
	execute(message, UsersDB) {
		UsersDB.findOne({ name: message.author.id }, function(err, users) {
			if (err) return;
			if (users != null) {
				return message.channel.send("You are already registered in my database,\nif you wish to edit or remove yourself from the database please use the appropate commands (see **t.help** for more info)");
			}
			if (message.content.slice(11).match(/((?:http|https|)\/\/(?:t|telegram)\.me)/gi)){
				const addUserDB = new UsersDB ({ name: message.author.id, link: message.content.slice(11).trim() });
				addUserDB.save(function(err, addUserDB){
					if (err) return console.error(err);
					message.channel.send('Congrats you registered successfully');
				});
			} 
			else {
				return message.channel.send("hmm... that doesn't seem to be a valid telegram link\nmake sure you formatted the command properly (check t.help to see proper formatting)");
			}	 
		});
	},
};