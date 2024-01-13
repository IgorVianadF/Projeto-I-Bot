const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Sinceramente, eu não faço ideia do que colocar aqui"),
        
    async execute(interaction){
        await interaction.reply("https://www.youtube.com/playlist?list=PLRhaEbDUAXQ5YYOBsbKIMevcGgQF08-LN")
    }
}