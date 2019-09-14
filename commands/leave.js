exports.run = (client, message, args, tools, msg, sender) => {

	const voiceChannel = message.member.voiceChannel;
	voiceChannel.leave();
	message.channel.send(":white_check_mark: I've successfully left your voice channel.");
};