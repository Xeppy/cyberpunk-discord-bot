exports.run = (client, message, args, tools, msg, sender) => {
	let nrOfDice;
	let sidedDice;

	if (!args[0]) {
		nrOfDice = 1;
		sidedDice = 10;
	} else {
		const roll = args[0].split('d');

		nrOfDice = parseInt(roll.slice(0,1)[0]);

		sidedDice = parseInt(roll.slice(1)[0]);
	}

	if(nrOfDice > 10){
			message.reply(" only roll up to 10 dice at a time!");
			return;
	}
	if (sidedDice !== 6 && sidedDice !== 10) {
		message.reply("Does this look like D&D to you buddy?");
		return;
	}
	for (var i = 0; i < nrOfDice; i++) {
		let roll = Math.floor(Math.random() * sidedDice) + 1;
		let mod;
		message.reply("You rolled a " + roll);
		if(roll === 1 && sidedDice === 10){
			mod = Math.floor(Math.random() * sidedDice) + 1;
			message.channel.send('https://media3.giphy.com/media/jVAt83ieT49H6ja5Ty/giphy.gif')
			message.reply(` not good Samurai, rolling another d10 to subtract... Take off **${mod - 1}** from your check, Choomba`);

		} else if (roll === 10 && sidedDice === 10) {
			mod = Math.floor(Math.random() * sidedDice) + 1;
			message.channel.send('https://thumbs.gfycat.com/FriendlyBrownDog-size_restricted.gif');
			message.reply(` That's what I'm talking about Choomba! Have another d10... your total roll is ${mod + 10}`);
		}
	}
}