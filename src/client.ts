// Includes
const { Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const loadMongo = require("./handlers/mongodb");
const {loadCommands} = require("./utility");
const { token } = require("../.config.json");
import { resolve } from 'path'
const path = resolve(__dirname, "commands");

client.commands = loadCommands(path);

// Connect to database
loadMongo();

// Startup
client.once("ready", () => {
	console.log("Started up successfully");
	client.user.setActivity(`Use /help for info`);
});


// Slash Commands
client.on('interactionCreate', async interaction => {
	const command = client.commands.get(interaction.commandName);
	try {
		command.execute(client, interaction);
	}
	catch (err){
		console.log(err);
	}
});

// Bot login
client.login(token);
