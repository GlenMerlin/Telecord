const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "help",
	description: "Sends this help message",
	execute(client, interaction) {
		const helpEmbed = new MessageEmbed()
			.setTitle("Command List")
			.setColor("0088cc")
			.setFooter(`Bot made by GlenMerlin, currently serving ${client.guilds.cache.size} Server(s)`);

		client.commands.forEach((command) => {
			helpEmbed.addField(
				`/${command.name}`,
				command.description || "No description",
			);
		});
		helpEmbed.addField(
			"Note:",
			"This bot cannot send messages between Discord and Telegram, all bots are simply incapable of doing this, you need to use a webhook service like pipedream or IFTTT",
		);
		return interaction.reply({ embeds: [helpEmbed] });
	},
};
