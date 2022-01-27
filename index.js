import DiscordJS, { Client, Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()
console.log("Bot starting")

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('Readyifying...')
    global.startTime = new Date()

    client.user.setActivity("Chess", { type: "COMPETING"})

    // guild
    global.occc = client.guilds.cache.get('919369946855784448')

    // channels
    global.welcome = client.channels.cache.get('919369946855784451') // welcome channel
    global.alert = client.channels.cache.get('936126646145130506')    // alerts channel
    global.test = client.channels.cache.get('936107832275775548')    // bot-testing channel
    
    // permission levels
    global.officers = global.occc.roles.cache.get('919369946855784449') // officer
    global.advisor = global.occc.roles.cache.get('934005868800921630') // advisor
    console.log('Bot readied at ' + global.startTime.toLocaleTimeString() + '.')
    global.alert.send('Bot started at ' + global.startTime.toLocaleTimeString() + '.')
})

function shutdown() { // todo Time ran for
    console.log('Shut down at ' + new Date().toLocaleTimeString() + '.\nBot ran for ' + NaN)
    global.alert.send('Shut down at ' + new Date().toLocaleTimeString() + '.\nBot ran for ' + NaN).then(m => {
        client.destroy()
        process.exit(1)
      })
}

function restart() {
    console.log('Restarted at ' + new Date().toLocaleTimeString() + '.')
    global.alert.send('Restarted at ' + new Date().toLocaleTimeString() + '.').then(m => {
        client.destroy()
        client.login(process.env.TOKEN)
      })
}

client.on('messageCreate', (message) => {
    if(message.author.bot)
        return // not a bot
    
        if(message.channel == global.welcome) {
        global.welcome.send(message.content)
        message.delete()
    }

    if(message.member.roles.cache.has(global.officers.id) || message.member.roles.cache.has(global.advisor.id)) {
        // officer
        if(message.content == '/shutdown') {
            shutdown()
        } else if (message.content == '/restart') {
            restart()
        }

        if(message.member.roles.cache.has(global.advisor.id)) {
            // advisor

        }
    }
}

,client.login(process.env.TOKEN))