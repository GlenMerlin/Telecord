const { MessageEmbed } = require("discord.js");

const { prefix } = require("../.config.json");

module.exports = {
	name: "help",
	description: "sends this help message",
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
			"this Bot cannot send messages between discord and telegram (this is a restriction with telegram's API) Instead of using a bot to do this you need to use a webhook through a service like\npipedream or IFTTT",
		);
		message.channel.send(helpEmbed);
	},
};
