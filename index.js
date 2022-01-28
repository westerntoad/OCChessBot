import DiscordJS, { Client, Intents, Permissions } from 'discord.js'
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

    // application commands
    client.api.applications(client.user.id).guilds(process.env.GUILD_ID).commands.post({data: {
        name: 'ping',
        description: 'ping pong!'
    }})

    console.log('Bot readied at ' + global.startTime.toLocaleString() + '.')
})

function shutdown() { // todo Time ran for
    console.log('Shut down at ' + new Date().toLocaleString() + '.\nRan for ' + NaN)
    client.destroy()
    process.exit(1)
}

function restart() {
    console.log('Restarted at ' + new Date().toLocaleString() + '.')
    client.destroy()
    client.login(process.env.TOKEN)
}

function alert(text) {
    try {
        client.channels.cache.get(process.env.C_ALERT).send(text)
    } catch(err) {
        console.log('ERROR: Cannot send alert.')
    }
}

client.on('messageCreate', (message) => {
    if(message.author.bot)
        return // anyone not a bot
    
    
    
    if(message.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) {
        // can ban and kick
        if (message.content == '/restart')
            restart()


        if(message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
            // admin
            //if(message.content == '/shutdown')
                //shutdown()
        }
    }
})

client.ws.on('INTERACTION_CREATE', async interaction => {
    client.api.interactions(interaction.id, interaction.token).callback.post({data: {
        type: 4,
        data: {
          content: 'hello world!'
        }
    }})
    //shutdown()
})

client.login(process.env.TOKEN)