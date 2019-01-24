module.exports = new (class cmd {
    constructor() {
        this.name = "ping";
        this.category = "others";
        this.help = "Mostro minha latência";
        this.cooldown = 3;
        this.cdMessage = "Wait 3 seconds to use this again";
        this.aliases = ["pong"]
    }
    run({ message, buildMessage, client, args}){
        message.reply(`:ping_pong:Pong ${Math.floor(message.client.ping)}`)
        console.log(args)
    }
})