const {Events}=require('discord.js');

module.exports={
    name:Events.InteractionCreate,
    async execute(interaction){
        if (interaction.isStringSelectMenu()){
            const interacao = interaction.values[0];
            switch (interacao) {
                case 'javascript':
                    await interaction.reply('https://developer.mozilla.org/en-US/docs/Web/JavaScript');
                    break;
                case 'python':
                    await interaction.reply('https://docs.python.org/3/');
                    break;
                case 'java':
                    await interaction.reply('https://docs.oracle.com/en/java/');
                    break;
                case 'cs':
                    await interaction.reply('https://learn.microsoft.com/en-us/dotnet/csharp/');
                    break;
            }
        }
        if (!interaction.isChatInputCommand())return

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command){
            console.error(`Não foi encontrado o comando ${interaction.commandName}`)
            return;
        }
        try{
            await command.execute(interaction)
        } catch (err){
            console.error(err)
            if(interaction.replied||interaction.deffered){
                await interaction.followUp({content:`Houve um erro durante a interação`,ephemeral:true})
            } else {
                await interaction.reply({content:`Houve um erro durante a interação`, ephemeral:true})
            }
        }
    }
}