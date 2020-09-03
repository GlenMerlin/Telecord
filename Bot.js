// Includes
const { prefix, token, mongodb } = require('./.config.json');
const fs = require('fs');
const Discord = require('discord.js');
const mongoose = require('mongoose');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

// Connect to database
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('database connection successful');
});


// Startup
bot.once('ready', () => {
	console.log('Started up successfully');
	bot.user.setActivity(`Use t.help for info | (direct DMs coming soon)`);

});

const UsersSchema = new mongoose.Schema({
	name: String,
	link: String,
});

const UsersDB = mongoose.model('User', UsersSchema);

// Commands
bot.on('message', async message => {
	if(message.author.bot) return;
	if (message.content.startsWith(prefix)) {
		const input = message.content.slice(prefix.length).trim().split(' ');
		const command = input.shift();
		try {
			// Help Command here
			if (command === 'help') {
				bot.commands.get('help').execute(message, Discord, bot);
			}

			// Register Command Here
			if (command === 'register') {
				bot.commands.get('register').execute(message, UsersDB);
			}
			// Profile Command Here
			if (command === 'profile') {
				bot.commands.get('profile').execute(message, UsersDB);
			}
			// Edit Command here
			if (command === 'edit') {
				bot.commands.get('edit').execute(message, UsersDB);
			}
			// Delete Command here
			if (command === 'delete') {
				bot.commands.get('delete').execute(message, UsersDB);
			}
			// Ping Command here
			if (command === 'ping'){
				bot.commands.get('ping').execute(bot, message);
			}

			// Source Command here
			if (command === 'source'){
				message.channel.send("My source code is available at <https://github.com/GlenMerlin/Telegram-Discord-Bot>!");
			}
		}
		catch(err) {
			message.channel.send('Oops something went wrong... try again later (make sure the bot has perms to embed messages)');
			console.log(err);
		}
		
	}
});
// Bot login
bot.login(token);