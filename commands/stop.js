const ytdl = require('ytdl-core');

exports.run = async (client, message, args, tools, msg, sender) => {
			let voiceChannel = message.guild.me.voiceChannel;
			if (!voiceChannel) return;
				let connection = await voiceChannel.join();
			  connection.stop();
};