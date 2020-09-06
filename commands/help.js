module.exports = {
	name: "help",
	description: "send the help message",
	execute(message, Discord, client) {
		if(!message.channel.permissionsFor(client.user).has('EMBED_LINKS')){
			return message.channel.send("Oops I don't have permission to embed messages, please contact the admins about this");
		}
		client.guilds.cache.get;
		const helpEmbed = new Discord.MessageEmbed()
			.setTitle('Command List')
			.addField('t.register:', 'to set up your account use `t.register <https://t.me/(username)>`')
			.addField('t.profile:', 'to call your profile link use `t.profile`, use `t.profile @JohnDoe#0000` to see if another user has a telegram account linked with the bot')
			.addField('t.edit', 'to edit the telegram link associated with your account type `t.edit <https://t.me/(username)>`')
			.addField('t.delete', 'to deregister your account from the database use `t.delete`')
			.addField('t.source', 'to view the source code for the bot on github and report any issues you may be having')
			.addField('Note:', 'this Bot is still in development and may have issues (visit https://t.me/telediscord for announcements)')
			.setColor('#0088cc')
			.setFooter(`Bot made by GlenMerlin, currently serving ${client.guilds.cache.size} Server(s)`);
		message.channel.send(helpEmbed);
	},
};