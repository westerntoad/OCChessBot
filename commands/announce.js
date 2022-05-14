const { SlashCommandBuilder } = require('@discordjs/builders');
var fs = require("fs");
var text = "";
//text += "@everyone\n";
text += fs.readFileSync("./text/announcement.txt").toString('utf-8');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('announce')
		.setDescription('Announces currently saved data in server!'),
	async execute(interaction) {
        await interaction.deferReply().then(resolve => {
            interaction.channel.send(text).then(resolve => {
                interaction.deleteReply()
            })
        })
	},
};
