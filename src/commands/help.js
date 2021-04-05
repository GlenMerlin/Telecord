const { MessageEmbed } = require("discord.js");

const { prefix } = require("../.config.json");

module.exports = {
	name: "help",
	description: "sends this help message",
	execute(client, interaction) {
		const helpEmbed = new MessageEmbed()
			.setTitle("Command List")
			.setColor("0088cc")
			.setFooter(
				`Bot made by GlenMerlin, currently serving ${client.guilds.cache.size} Server(s)`,
			);

		client.commands.forEach((command) => {
			helpEmbed.addField(
				`${prefix}${command.name}`,
				command.description || "No description",
			);
		});
		helpEmbed.addField(
			"Note:",
			"this Bot cannot send messages between discord and telegram (this is a restriction with telegram's API) Instead of using a bot to do this you need to use a webhook through a service like pipedream or IFTTT",
		);
		client.api.interactions(interaction.id, interaction.token).callback.post({ data: {
			type: 4,
			data: {
				embeds: [helpEmbed],
			},
		} });
	},
};
