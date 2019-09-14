const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 0.05 };

exports.run = async (client, message, args, ops, msg, sender) => {
	let voiceChannel = message.guild.me.voiceChannel;
	if (!voiceChannel) {
		voiceChannel = message.member.voiceChannel;
	}

	let validate = await ytdl.validateURL(args[0]);
	if (!validate) return message.reply(`That's an Invalid URL`);

	let info = await ytdl.getInfo(args[0])

	let data = ops.active.get(message.guild.id) || {};

	if ( !data.connection) data.connection = await message.member.voiceChannel.join();
	if ( !data.queue) data.queue = [];
	data.guildID = message.guild.id;

	data.queue.push({
		songTitle: info.title,
		requester: message.author.tag,
		url: args[0],
		announceChannel: message.channel.id
	});

	if (!data.dispatcher) play(client, ops, data);
	else {
		message.channel.send(`Added to Queue: ${info.title}`)
	}

	ops.active.set(message.guild.id, data);
};

async function play(client, ops, data) {
	console.log('called Play')
	console.log(data);
	client.channels.get(data.queue[0].announceChannel).send(`**Now Playing:** ${data.queue[0].songTitle}`)

	const stream = ytdl(data.queue[0].url, { filter : 'audioonly' });
	data.dispatcher = await data.connection.playStream(stream, streamOptions)
	data.dispatcher.guildID = data.guildID;

	console.log(data.dispatcher);
	data.dispatcher.once('end', function() {
		finish(client, ops, data);
	});
}

async function finish(client, ops, data) {
	console.log('Called Finish')
	let fetched = ops.active.get(data.guildID);
	fetched.queue.shift();

	if(fetched.queue.length > 0) {
		console.log('there is a next song')
		ops.active.set(data.guildID, fetched);
		await play(client, ops, data);
	} else {
		ops.active.delete(data.guildID);

		let vc = client.guilds.get(data.guildID).me.voiceChannel;
		if (vc) vc.leave();	
	}
}