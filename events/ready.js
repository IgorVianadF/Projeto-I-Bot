const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`O bot ${client.user.tag} foi logado!`);
	},
};