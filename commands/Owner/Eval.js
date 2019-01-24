function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
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
        var codigo = args.join(' ').replace(/`/g, '`')
        try {
            codigo = eval(codigo)
        }
        catch (err) {
            codigo = err;
        }
        codigo = await Promise.resolve(codigo)
        message.channel.send("```js\n" + codigo + "```")
    }
})
