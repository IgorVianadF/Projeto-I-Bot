// Require the necessary discord.js classes
const dotenv = require('dotenv');
dotenv.config()
const {TOKEN,CLIENT_ID,GUILD_ID} = process.env
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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


// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Sucesso! Logado como ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN); 

//Interações com o bot

client.on(Events.InteractionCreate, async interaction=>{
	if (!interaction.isChatInputCommand()) return
	const command = interaction.client.commands.get(interaction.commandName)
	if (!command){
		console.log(commandName)
		console.error('Comando não encontrado')
		return
	}
	try{
		await command.execute(interaction)
	} catch(e) {
		console.error(e)
		await interaction.reply("Houve um erro ao executar esse comando!")
	}
})

