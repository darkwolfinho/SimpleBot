module.exports = new (class cmd {
    constructor() {
        this.name = "kick";
        this.category = "moderation"
        this.help = "Kicke um usuário";
        this.cooldown = 5;
        this.cdMessage = "Wait 5 seconds to use this again";
        this.aliases = ["kickar"]
    }
    run({ message, buildMessage, client, args }) {
        let reason = args.slice(1).join(' ');
        if (!message.member.hasPermission(["KICK_MEMBERS"])) return message.reply("**No permission for Kick! (KICK_MEMBERS)**");
        if (message.mentions.members.size < 1) return message.reply("**Mention the User!**");
        let memberUser = message.guild.members.get(message.member.id)
        if (memberUser) {
            if (!memberUser.bannable) return message.reply("**The One Who Can not Be Kicked!**")
            if (memberUser.highestRole && message.member.highestRole) {
                if (memberUser.highestRole.position >= message.member.highestRole.position) 
                return message.reply("**The position of this User is greater than yours!**");
            }
        }
        if (!message.guild.member(message.mentions.users.first()).bannable) return message.reply("**I can not ban this User!**")
        const motivo = reason.length >= 2 ? args.slice(1).join(' ') : "No specific reason!";
        if (!message.mentions.users.first().bot) {
            let embed = new client.external.Discord.RichEmbed()
            .setColor(`#602bff`)
            .setAuthor(message.mentions.users.first().username, message.mentions.users.first().displayAvatarURL)
            .setDescription("You got kicked out of " + message.guild.name).setThumbnail(message.guild.iconURL)
            .addField("🔎 Motivo:", motivo, true)
            message.mentions.users.first().send(embed).then(function(){message.mentions.members.first().kick()}).catch(function(){message.mentions.members.first().ban()})
        }
        const embed = new client.external.Discord.RichEmbed()
        .setColor(`#602bff`)
        .setAuthor(message.mentions.users.first().username, message.mentions.users.first().displayAvatarURL)
        .setDescription("A user was kicked from the server!")
        .setThumbnail(message.mentions.users.first().displayAvatarURL)
        .addField("<:police:480764594122391553> Staff:", message.author, true)
        .addField("<:derp:480764594785091604> User Kicked:", message.mentions.users.first().tag, true)
        .addField(`🔎 Motivo:`, motivo, true)
        message.mentions.users.first().send(embed)
    }
})