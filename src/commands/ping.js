// THIS SECTION IS BROKEN PLEASE FIX THIS BEFORE MAKING A PR!!!!


const { MessageEmbed, Application } = require("discord.js");

module.exports = {
	name: "ping",
	description: "Checks the Server response time, API response time, and uptime of the bot",
	async execute(client, interaction) {
	// 	if (message.channel.type !== 'dm'){
	// 		if (!message.channel.permissionsFor(client.user).has("EMBED_LINKS")) {
	// 			return message.channel.send(
	// 				"Oops I don't have permission to embed messages, please contact the admins about this",
	// 			);
	// 		}
	// 	}
		const botMsg = await client.api.interactions(interaction.id, interaction.token).callback.post({ data: {
			type: 4,
			data: {
				content: "〽️ Pinging",
			},
		} });
	
		const pingEmbed = new MessageEmbed()
			.setTitle("🏓 Ping")
			.setDescription(
				"**Server**: `" + (botMsg.createdAt - interaction.createdAt) + "ms`",
				"**API**: `" + Math.round(client.ws.ping) + "ms`",
				"**Uptime**: `" + msToTime(client.uptime) + "`",
			)
			.setFooter("Requested by " + interaction.member.user.username)
			.setColor("0088cc")
			.setTimestamp(new Date());

		client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({ data:{
			type: 4,
			data:{
				embeds: [pingEmbed],
			},
		},
		}).catch(console.error());

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
