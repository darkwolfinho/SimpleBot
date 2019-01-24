module.exports = new (class cmd {
    constructor() {
        this.name = "ban";
        this.category = "moderation"
        this.help = "Bana um usuário";
        this.cooldown = 5;
        this.cdMessage = "Wait 5 seconds to use this again";
        this.aliases = ["banir"]
    }
    run({ message, buildMessage, client, args }) {
        let reason = args.slice(1).join(' ');
        if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.reply("**Sem permissão para banir! (BAN_MEMBERS)**");
        if (message.mentions.members.size < 1) return message.reply("**Mencione o Usuário!**");
        let memberUser = message.guild.members.get(message.mentions.users.first().id)
        if (memberUser) {
            if (!memberUser.bannable) return message.reply("**Esse Usuário não pode ser Banido!**")
            if (memberUser.highestRole && message.member.highestRole) {
                if (memberUser.highestRole.position >= message.member.highestRole.position)
                    return message.reply("**O cargo desse Usuário é maior que o seu!**");
            }
        }
        if (!message.guild.member(message.mentions.users.first()).bannable) return message.reply("**Eu não posso dar ban nesse Usuário!**")
        const motivo = reason.length >= 2 ? args.slice(1).join(' ') : "Sem motivo especificado!";
        if (!message.mentions.users.first().bot) {
            let embed = new client.external.Discord.RichEmbed()
                .setColor(`#602bff`)
                .setAuthor(message.mentions.users.first().username, message.mentions.users.first().displayAvatarURL)
                .setDescription("Voce foi banido de " + message.guild.name).setThumbnail(message.guild.iconURL)
                .addField("🔎 Motivo:", motivo, true)
            message.mentions.users.first().send(embed).then(function () { message.mentions.members.first().ban() }).catch(function () { message.mentions.members.first().ban() })
        }
        const embed = new client.external.Discord.RichEmbed()
            .setColor(`#602bff`)
            .setAuthor(message.mentions.users.first().username, message.mentions.users.first().displayAvatarURL)
            .setDescription("Um usuário foi banido do servidor!")
            .setThumbnail(message.mentions.users.first().displayAvatarURL)
            .addField("<:police:480764594122391553> Staff:", message.author, true)
            .addField("<:derp:480764594785091604> Banned:", message.mentions.users.first().tag, true)
            .addField(`🔎 Motivo:`, motivo, true)
        message.channel.send(embed)
    }
})