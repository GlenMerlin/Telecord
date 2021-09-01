const { SlashCommandBuilder} = require('@discordjs/builders');
const { REST } = require ('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientID, token } = require('./.config.json');

const commands = [
    new SlashCommandBuilder().setName('about').setDescription('Displays a message detailing what the bot does'),
    
    new SlashCommandBuilder().setName('delete').setDescription('Allows you to delete the profile associated with your discord account'),
    
    new SlashCommandBuilder().setName('edit').setDescription('Allows you to edit the profile associated with your discord account').addStringOption(option =>
        option.setName('link')
            .setDescription('The new link for your account')
            .setRequired(true)
    ),
    
    new SlashCommandBuilder().setName('help').setDescription('Displays a help message detailing all the commands and what they do'),
    
    new SlashCommandBuilder().setName('invite').setDescription('Displays a link to invite the bot to your own server'),
    
    new SlashCommandBuilder().setName('ping').setDescription('Displays latency information'),
    
    new SlashCommandBuilder().setName('profile').setDescription('Displays a profile, leave it blank to display your own').addUserOption(option => 
        option.setName('username')
            .setDescription('searches for a user, to display your profile delete this option (mentions or snowflakes accepted)')
            .setRequired(false)),

    new SlashCommandBuilder().setName('register').setDescription('Registers you in the database').addStringOption(option =>
        option.setName('link')
            .setDescription('The link to register your account, format: https://t.me/(username)')
            .setRequired(true)
    ),
    
    new SlashCommandBuilder().setName('source').setDescription('Displays a link to the source code'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		await rest.put(
			Routes.applicationCommands(clientID),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();