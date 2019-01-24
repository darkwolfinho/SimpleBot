module.exports = new (class cmd {
    constructor() {
        this.name = "clear";
        this.category = "moderation"
        this.help = "Clear the chat";
        this.cooldown = 5;
        this.cdMessage = "Wait 5 seconds to use this again";
        this.aliases = ["limpar"]
    }
    run({ message, buildMessage, client, args }) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
        if (isNaN(args[0])) return message.reply("**Use: " + client.prefix + "clear [1 ao 100]**");
        if (args[0] > 100) return message.reply("**Use: " + client.prefix + "clear [1 ao 100]**");
        if (args[0] < 1) return message.reply("**Use: " + client.prefix + "clear [1 ao 100]**");
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`:pig: **${args[0]} Messages have been cleared!**`).then(msg => msg.delete(6 * 1000));
        });
    }
})