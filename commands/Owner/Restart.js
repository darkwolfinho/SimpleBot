module.exports = new (class cmd {
    constructor() {
        this.name = "reset";
        this.category = "owner"
        this.help = "Owner Command Restart";
        this.cooldown = 0;
        this.cdMessage = "Wait 0 seconds to use this again";
        this.aliases = ["restart"]
    }
    run({ message, buildMessage, client, args }) {
        if (client.external.Owners.indexOf(message.author.id) == -1) return message.channel.send(`:no_good: ${message.author.toString()} You are not allowed to use this command`);
		message.channel.send("Bot Restarted!")
		client.restart();
    }
})
