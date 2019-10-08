const ytdl = require('ytdl-core');

exports.run = async (client, message, args, ops, msg, sender) => {
	let voiceChannel = message.guild.me.voiceChannel;
	if (!voiceChannel) return;
	let data = ops.active.get(message.guild.id) || {};

	const playing = data.connection.dispatcher;
	playing.resume();
};
