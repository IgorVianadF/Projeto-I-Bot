const dotenv = require('dotenv');
dotenv.config()
const {TOKEN} = process.env
const { Client, GatewayIntentBits, Collection} = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], });

client.commands = new Collection()


//Comandos:
const fs = require('node:fs')
const path = require('node:path')
const commandsPath = path.join(__dirname,"commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for(const file of commandFiles){
	const filePath = path.join(commandsPath,file)
	const command = require(filePath)

	if('data'in command && "execute" in command){
		client.commands.set(command.data.name, command)
	} else {
		console.log(`Comando: '${filePath}' está ausente de "data" ou "execute"`)
	}
}


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file=>file.endsWith('.js'))

for(const file of eventFiles){
	const filePath = path.join(eventsPath,file);
	const event = require(filePath);
	if (event.once){
		client.once(event.name, (...args)=>event.execute(...args))
	}else{
		client.on(event.name,(...args)=>event.execute(...args));
	}
}

client.login(TOKEN); 

