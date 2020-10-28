const { DiscordAPIError, MessageEmbed } = require("discord.js");

module.exports = {
	name: "about",
	description: "Sends a message explaining the bot",
	async execute(client, message) {
		const aboutEmbed = new MessageEmbed()
			.setTitle("About")
			.setColor("0088cc")
			.addField("What is Telecord?", "Telecord is a discord bot to link your Discord Account and Telegram Account so you can easily start up encrypted chat messages with your discord friends! ")
		// more info coming soon
			.setFooter(`Bot made by GlenMerlin, currently serving ${client.guilds.cache.size} Server(s)`);
		message.channel.send(aboutEmbed);
        
	},
};