import DiscordJS, { Client, Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

const channel = client.channels.cache.get('919369946855784455')

client.on('ready', () => {
    console.log('Loading...')

    // guild
    global.occc = client.guilds.cache.get('919369946855784448')

    // channels
    global.welcome = client.channels.cache.get('919369946855784451') // welcome channel
    global.test = client.channels.cache.get('936107832275775548')    // bot-testing channel
    
    // permission levels
    global.officers = global.occc.roles.cache.get('919369946855784449') // officer
    global.advisor = global.occc.roles.cache.get('934005868800921630') // advisor
    console.log('The bot is ready.')
})

client.on('messageCreate', (message) => {
    if(!message.author.bot) {
        // not a bot
        if(message.channel == global.welcome) {
            global.welcome.send(message.content)
            message.delete()
        }

        if(message.member.roles.cache.has(global.officers.id) || message.member.roles.cache.has(global.advisor.id)) {
            // officer
            if(message.content == '/shutdown') {
                //test.send('Shutting down...')
                client.destroy()
            }

            if(message.member.roles.cache.has(global.advisor.id)) {
                // advisor

            }
        }
    }
}

,client.login(process.env.TOKEN))