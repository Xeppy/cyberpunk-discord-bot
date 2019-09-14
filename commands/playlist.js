const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 0.05 };

exports.run = async (client, message, args, ops, msg, sender) => {
	let voiceChannel = message.guild.me.voiceChannel;
	if (!voiceChannel) {
		voiceChannel = message.member.voiceChannel;
	}

	let data = ops.active.get(message.guild.id) || {};

	if ( !data.connection) data.connection = await message.member.voiceChannel.join();
	if ( !data.queue) data.queue = [];
	data.guildID = message.guild.id;

	let playlistName = args[0];
	if (!playlistName) return message.reply('you must specify a playlist name');
	let playlist;
	try {
		playlist = require(`../cp_playlists/${playlistName}.json`);
	} catch (e) {
		message.reply('No playlist with that name found');
		return;
	}
	playlist["songs"].forEach((url, i) => {
		data.queue.push({
			songTitle: i + 1,
			requester: message.author.tag,
			url: url,
			announceChannel: message.channel.id
		});
	})


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