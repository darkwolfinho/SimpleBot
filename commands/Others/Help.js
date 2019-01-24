module.exports = new (class cmd {
    constructor() {
        this.name = "help";
        this.category = "others"
        this.help = "see my commands";
        this.cooldown = 2;
        this.cdMessage = "Wait 2 seconds to use this again";
        this.aliases = ["cmds", "commands", "ajuda"]
    }
    run({ message, buildMessage, client, args }) {
        /*buildMessage({
             description:client.commands.map(a => "`"+a.name[a.name.length-1]+"("+a.help+")`").join(", ")
         }).send()*/
        let embed = new client.external.Discord.RichEmbed()
        .addField("Moderation", client.commands.filter(a => a.category == "moderation").map(a => client.user.username + "** " + a.name[a.name.length - 1] + "** ``(" + a.help + ")``").join("\n"))
        buildMessage( embed ).send()
    }
})