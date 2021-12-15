const { MessageEmbed} = require("discord.js");
const wait = require('util').promisify(setTimeout);

module.exports = {
	name: "ping",
	description: "Checks the Server response time, API response time, and Uptime of the bot",
	async execute(client, interaction) {
		let botMsg = new Date();
		
		interaction.reply("〽️ Pinging");
		await wait (1500)

		const pingEmbed = new MessageEmbed()
			.setTitle("🏓 Ping")
			.addFields(
				{name: "**Server**:", value: `${(botMsg - interaction.createdAt)} ms`},
				{name: "**API**:", value: `${Math.round(client.ws.ping)} ms`},
				{name: "**Uptime**:", value: `${msToTime(client.uptime)}`},
			)
			.setFooter("Requested by " + interaction.user.username)
			.setColor("0088cc")
			.setTimestamp(new Date());

		// this may look like it sends nothing but it contains a zero width character to remove the original pinging message
		await interaction.editReply({ content: "​", embeds: [pingEmbed] });	
		
		function msToTime(ms) {
			let days = Math.floor(ms / 86400000);
			let daysms = ms % 86400000;
			let hours = Math.floor(daysms / 3600000);
			let hoursms = ms % 3600000;
			let minutes = Math.floor(hoursms / 60000);
			let minutesms = ms % 60000;
			let sec = Math.floor(minutesms / 1000);
		
			let str = "";
			if (days) str = str + days + "d ";
			if (hours) str = str + hours + "h ";
			if (minutes) str = str + minutes + "m ";
			if (sec) str = str + sec + "s";
		
			return str;
			}

		},
};
