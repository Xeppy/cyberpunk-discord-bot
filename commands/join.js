exports.run = async (client, message, args, tools, msg, sender) => {
		return new Promise((resolve, reject) => {
		const voiceChannel = message.member.voiceChannel;
		 if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply(':no_entry_sign: I couldn\'t connect to your voice channel.');
		 voiceChannel.join()
			.then(connection => {
				message.channel.send(":white_check_mark: Connected!")
			})
			.catch(console.error);
		});
};