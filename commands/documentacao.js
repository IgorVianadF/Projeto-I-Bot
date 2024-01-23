const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js")

const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId('select')
            .setPlaceholder('Nenhuma linguagem selecionada')
            .addOptions({
                label:"JavaScript",
                description: "Veja a documentação do JavaScript",
                value:'javascript'
            },{
                label:"Python",
                description: "Veja a documentação do Python",
                value:'python'
            },{
                label:"Java",
                description: "Veja a documentação do Java",
                value:'java'
            },{
                label:"C#",
                description: "Veja a documentação do C#",
                value:'cs'
            }
            )
    )

module.exports={
    data:new SlashCommandBuilder()
    .setName('docs')
    .setDescription('Acesse a documentação de alguma linguagem'),

    async execute(interaction){
        await interaction.reply({content:'Selecione uma das teconologias abaixo:', components:[row]})
    }
}