module.exports = new (class cmd {
    constructor() {
        this.name = "say";
        this.category = "others";
        this.help = "I show my latency";
        this.cooldown = 3;
        this.cdMessage = "Wait 3 seconds to use this again";
        this.aliases = []
    }
    run({ message, buildMessage, client, args}){
		let reason = args.join(" ");
		if (reason.length < 1) return message.reply('**Please enter a text!**');
		message.channel.send(reason);
    }
})