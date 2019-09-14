const Discord = require('discord.js');
require('dotenv').config()
const client = new Discord.Client();

const prefix = '!';
const ownerID = '169010985573679104';
const active = new Map();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
	
	let msg = message.content.toUpperCase();
	let sender = message.author;
	let args = message.content.slice(prefix.length).trim().split(' ');
	let cmd = args.shift().toLowerCase();

	if (!msg.startsWith(prefix)) return;
	if (message.author.bot) return;

	try {

		let ops = {
			ownerID: ownerID,
			active: active
		}

		let commandFile = require(`./commands/${cmd}.js`);
		commandFile.run(client, message, args, ops, msg, sender);
	
	} catch (e) {
		console.log(e);
	} finally {
		console.log(`${message.author.tag} ran the command ${cmd}`);
	}
})

client.login(process.env.CLIENT_TOKEN);
