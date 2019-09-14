exports.run = async (client, message, args, ops, msg, sender) => {
	let data = ops.active.get(message.guild.id);
	if (!data || !data.queue || data.queue.length < 1) return message.reply('There is nothing in the queue!');
	data.queue.forEach((song, i) => {
		message.channel.send(`${i + 1}: ${song.songTitle}`);
	});
}