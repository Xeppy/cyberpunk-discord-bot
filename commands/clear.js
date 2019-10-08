const ytdl = require('ytdl-core');

exports.run = async (client, message, args, ops, msg, sender) => {
	let voiceChannel = message.guild.me.voiceChannel;
	if (!voiceChannel) return;

	let data = ops.active.get(message.guild.id) || {};

	if (!data.queue) return;
	data.guildID = message.guild.id;

	data.queue = [];

	message.channel.send('The Queue has been cleared');
};
