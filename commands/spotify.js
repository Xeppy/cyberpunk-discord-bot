const Discord = require('discord.js');

exports.run = (client, message, args) => {
	let user = message.author;

	let userSession = user.presence.game;
	if(
		userSession !== null && 
		userSession.type === 2 && 
		userSession.name === 'Spotify' &&
		userSession.assets !== null
		) {
			let imageFragment = userSession.assets.largeImage.slice(8);
			let trackIMG = `https:i.scdn.co/image/${imageFragment}`;
			let trackURL = `https://open.spotify.com/tracks/${userSession.syncID}`;
			let trackName = userSession.details;
			let trackAuthor = userSession.state;
			let trackAlbum = userSession.assets.largeText;
			const embed = new Discord.RichEmbed()
			.setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
			.setColor(0x1ED760)
			//.setThumbnail(trackIMG)
			.addField('Song Name', trackName, true)
			.addField('Album', trackAlbum, true)
			.addField('Author', trackAuthor, false)
			
			message.channel.send(embed);
		} else {
			message.reply("**You aren't listening to Spotify, please play a song and make sure you have spotify connected**")
		}
}