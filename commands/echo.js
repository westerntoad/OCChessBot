const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Will repeat what you said!'),
        //.addStringOption(option =>
            //option.setName('input')
                //.setDescription('The input to echo back')
                //.setRequired(true)),
	async execute(interaction) {
        client.on('message', message => {
            if(interaction.member.user.id == message.author.id) {
                interaction.reply(message.content);
            }
        })
        
        //interaction.channel.send(interaction.options.getString('input'))
        //    .then(resolve => {
        //        console.log('ignore this');
        //    })
	},
};
