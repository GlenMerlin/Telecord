// Includes
const { resolve } = require("path");

const Discord = require("discord.js");
const parser = require("discord-command-parser");

const loadMongo = require("./handlers/mongodb");

const { prefix, token } = require("./.config.json");
const { loadCommands } = require("./utility");

const client = new Discord.Client();

const path = resolve(__dirname, "commands");
client.commands = loadCommands(path);

// Connect to database
loadMongo();

// Startup
client.once("ready", () => {
	console.log("Started up successfully");
	client.user.setActivity(`Use t.help for info`);
	client.api.applications(client.user.id).guilds('560585485249151026').commands.post({
		data: {
			"name": "SlashCommand",
			"description": "This Command is a test",
		},
	});
});
// Add code to make the bot run through a tutorial when it is first added to a server

// Slash Commands
client.ws.on('INTERACTION_CREATE', async interaction => {
	client.api.interactions(interaction.id, interaction.token).callback.post(({
		data: {
			type: 4,
			data: {
				content: 'hello world!',
			},
		},
	}));
});
// Commands
client.on("message", async (message) => {
	if (message.author.bot){
		return;
	}
	const parsed = parser.parse(message, prefix);
	if (parsed.error) {
		return;
	}
	const command = client.commands.get(parsed.command.toLowerCase());
	if (!command) return;
	try {
		command.execute(client, message, parsed.args);
	}
	catch (err) {
		message.channel.send(
			"Oops! An error has occured! If this keeps happening, please open an issue on github (see `t.source`)",
		).catch(err => {
			// API Error Handling
			// TODO: Will try to implement something so API Errors don't flood the logs but for now, it ignores the error.
			return err;
		});
		console.log(err);
	}
});

// Bot login
client.login(token);
