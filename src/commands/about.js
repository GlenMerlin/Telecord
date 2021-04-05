const { DiscordAPIError, MessageEmbed } = require("discord.js");

module.exports = {
	name: "about",
	description: "Sends a message explaining the bot",
	async execute(client, interaction) {
		const aboutEmbed = new MessageEmbed()
			.setTitle("About")
			.setColor("0088cc")
			.addField("What is Telecord?", "Telecord is a discord bot to link your Discord Account and Telegram Account so you can easily start up encrypted chat messages with your discord friends! ")
			.setFooter(`Bot made by GlenMerlin, currently serving ${client.guilds.cache.size} Server(s)`);
		client.api.interactions(interaction.id, interaction.token).callback.post({ data: {
			type: 4,
			data: {
				embeds: [aboutEmbed],
			},
		} });
	},

};