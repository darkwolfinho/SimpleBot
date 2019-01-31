function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

module.exports = new (class cmd {
    constructor() {
        this.name = "eval";
        this.category = "owner"
        this.help = "Owner Command";
        this.cooldown = 0;
        this.cdMessage = "Wait 0 seconds to use this again";
        this.aliases = []
    }
    async run({ message, buildMessage, client, args }) {
        if (client.external.Owners.indexOf(message.author.id) == -1) return message.channel.send(`:no_good: ${message.author.toString()} You are not allowed to use this command`)
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
        return true;
    }

})Copy
