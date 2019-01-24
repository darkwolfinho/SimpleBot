module.exports = new (class cmd {
    constructor() {
        this.name = "avatar";
        this.category = "others"
        this.help = "See someone avatar";
        this.cooldown = 2;
        this.cdMessage = "Wait 2 seconds to use this again";
        this.aliases = []
    }
    run({ message, buildMessage, client, args}){
        buildMessage({
            image: {
                url: message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL : message.author.displayAvatarURL
            }
        }).send() // you can pass an channel id to send
    }
})