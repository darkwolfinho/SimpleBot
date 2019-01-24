const command = require("command-discord");
const client = command.Client({
    token: "Your Token",
    color: "65535", //optional color for  embeds in decimal (65535 default)
    path: "./commands", // path for commands folder, (./commands default)
    prefix: "'", // prefix can be an array, (! default)
    prefixConfig: {
        useUsername: true,
        useMention: true,
    },
    external: [
        { key: "Discord", value: require("discord.js") },
        { key: "Owners", value: [" Your ID "] },
        { key: "Support", value: " Your Group Link " }
    ] // external variables to use instead of doing global variables

}, {
        //client options for discordjs (https://discord.js.org/#/docs/main/stable/typedef/ClientOptions)
    });

// Jogando do Bot
client.on("ready", async () => {
    console.log('on')
    // Jogando do Botv
    const falas = [`Use ${client.prefix}help or ${client.prefix}ajuda`, `Use ${client.prefix}help to view my Commands`]
    setInterval(() => {
        var selecionada = falas[Math.floor(Math.random() * falas.length)]
        if (selecionada == null) selecionada = falas[Math.floor(Math.random() * falas.length)]
        client.user.setPresence({ game: { name: `${selecionada}` } })
    }, 5 * 60 * 1000)
    client.user.setPresence({ game: { name: falas[0] } })
});

client.start(); // you can pass token here, if you dont want to pass options