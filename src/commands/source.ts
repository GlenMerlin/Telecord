module.exports = {
	name: "source",
	description: "Gives a message with the source code of the bot",
	execute: (client, interaction) => {
		interaction.reply("My source code is available at <https://github.com/GlenMerlin/Telecord>!",);
	},
};
