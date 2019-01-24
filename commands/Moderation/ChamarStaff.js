const Discord = require("discord.js");
module.exports = new (class cmd {
  constructor() {
      this.name = "chamarstaff";
      this.category = "moderation"
      this.help = "See someone avatar";
      this.cooldown = 60;
      this.cdMessage = "Wait 60 seconds to use this again";
      this.aliases = []
  }
  run({ message, buildMessage, client, args }) {
    let msg = args.join(" ");
    var pessoas = "";
    var a = 1
    if (message.author.id == message.guild.ownerID || message.member.hasPermission(["ADMINISTRATOR"]) || message.member.hasPermission(["MANAGE_GUILD"]) || message.guild.Ownerid) {
      message.channel.send("Alertando os admins...")
      message.guild.members.forEach(member => {
        if (member.hasPermission("ADMINISTRATOR") && !member.user.bot || member.hasPermission("BAN_MEMBERS") && !member.user.bot || member.hasPermission("KICK_MEMBERS") && !member.user.bot || member.hasPermission("MANAGE_ROLES") && !member.user.bot) {
          if (!msg) {
            let embed = new Discord.RichEmbed()
              .setColor(`#602bff`)
              .setAuthor(client.user.username, client.user.avatarURL)
              .setDescription(`${message.author} está chamando você!\n\n**Servidor:** ${message.guild.name}\n**Chat:** ${message.channel}`)
              .setThumbnail(message.guild.iconURL)
            member.send({ embed })
            pessoas += "<@" + member.user.id + "> "
          } else {
            let embed = new Discord.RichEmbed()
              .setColor(`#602bff`)
              .setAuthor(client.user.username, client.user.avatarURL)
              .setDescription(`${message.author} está chamando você!\n\n**Servidor:** ${message.guild.name}\n**Chat:** ${message.channel}\n**Mensagem:** ${msg}`)
              .setThumbnail(message.guild.iconURL)
            member.send({ embed })
            pessoas += "<@" + member.user.id + "> "
          }
        }
      })
      let embed = new Discord.RichEmbed()
        .addField(":telephone_receiver: Pessoas Chamadas:", pessoas)
      message.channel.send({ embed })
    } else {
      message.channel.send(":no_good: " + message.author + " Apenas os Donos/Lideres da guilda podem usar este comando!");
    }
  }
})