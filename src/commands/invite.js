module.exports = {
	name: "invite",
	description: "Sends a link to add the bot to your own server",
	execute(client, message, args) {
		message.channel.send("All you have to do to add me to your server is click this link https://bit.ly/TelegramDiscordBot and follow the instructions on the page it opens");
	},
};