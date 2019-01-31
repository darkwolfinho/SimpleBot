const command = require("command-discord");
// all parameters in this object are optional, you can pass token in the start function, bellow parameters are the default
const client = command.Client({
    token:"Your bot token",
    color:"65535", //optional color for  embeds in decimal (65535 default)
    path:"./commands", // path for commands folder, (./commands default)
    prefix:"h!", // prefix can be an array if you need multiple prefix, (! default)
    // example: ['h!','!']
    logErrors:true, // true default, if you dont want to console log errors in command false
    // you can get errors using the commandError event
    commandExists:false,
    commandExistsContent:{
        embed:{ // Message using in commandExists
            color: "16711680",
            description:"We dont have this command yet"
        }
    },
    // if commmand dont exists reply with a content (in this case a embed) default is false
    prefixConfig:{
         useUsername: true,
          useMention: true,
          // if you dont want to use username or mention as an prefix put these false (default is true)
          editMessage:true // if editing a message can run a command default is true
    }, 
    external:[{ key: "Discord", value: require("discord.js") },
        { key: "Owners", value: [" Your ID "] },
        { key: "Support", value: " Your Group Link " }] 
    // external variables to use instead of doing global variables
    // Exemple: Use as client.external.Discord
    
},{
    // client options for discordjs (https://discord.js.org/#/docs/main/stable/typedef/ClientOptions)
});

client.on("commandError", function (command, error) {
    console.error(`Error ${error.toString()} in command ${command.name}`)
    //this log is automatic if you dont disable the logErrors option
})

// Jogando do Bot
client.on("ready", async () => {
    console.log('on')
    // Jogando do Botv
    const falas = [`Use ${client.prefix[0]}help`, `Use ${client.prefix[0]}help to view my Commands`
    setInterval(() => {
        var selecionada = falas[Math.floor(Math.random() * falas.length)]
        if (selecionada == null) selecionada = falas[Math.floor(Math.random() * falas.length)]
        client.user.setPresence({ game: { name: `${selecionada}` } })
    }, 5 * 60 * 1000)
    client.user.setPresence({ game: { name: falas[0] } })
});

client.start(); // you can pass token here, if you dont want to pass options