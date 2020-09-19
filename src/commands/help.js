const { MessageEmbed } = require("discord.js");

const { prefix } = require("../.config.json");

module.exports = {
	name: "help",
	description: "send the help message",
	execute(client, message, args) {
		if (message.channel.type !== 'dm'){
			if (!message.channel.permissionsFor(client.user).has("EMBED_LINKS")) {
				return message.channel.send(
					"Oops I don't have permission to embed messages, please contact the admins about this",
				);
			}
		}
		const helpEmbed = new MessageEmbed()
			.setTitle("Command List")
			.addField(
				"Note:",
				"this Bot is still in development and may have issues (visit https://t.me/telediscord for announcements)",
			)
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

		message.channel.send(helpEmbed);
	},
};
