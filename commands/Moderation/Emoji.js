var moment       = require('moment/moment');moment.locale('pt-BR');
const emojimap = {
    ' ': '   ','0': ':zero:',
    '1': ':one:','2': ':two:',
    '3': ':three:','4': ':four:',
    '5': ':five:','6': ':six:',
    '7': ':seven:','8': ':eight:',
    '9': ':nine:','!': ':grey_exclamation:',
    '?': ':grey_question:','#': ':hash:',
    '*': ':asterisk:'
};
'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
    emojimap[c] = emojimap[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});
module.exports = new (class cmd {
    constructor() {
        this.name = "emoji";
        this.category = "moderation"
        this.help = "See someone avatar";
        this.cooldown = 2;
        this.cdMessage = "Wait 2 seconds to use this again";
        this.aliases = ["emojiinfo","emojinfo"]
    }
    run({ message, buildMessage, client, args }) {
        if(!args[0]){
            let embed = new client.external.Discord.RichEmbed()
            .setAuthor(`Emoji System`, client.user.avatarURL)
            .setColor(`#602bff`)
            .setDescription("Diga uma categoria do nosso sistema de Emojis!\n\n**| `list`, `info`, `letras` |**\n\nExemplo: "+client.prefix+"emoji info")
            message.reply({embed})
            return;
        }
        let command = args[0].toLowerCase()
        if(command == "letras"){
            let reason = args.slice(1).join(' ');
            if (reason.length < 1) return message.reply('Voce nao falou oque quer falar!');
            message.reply(     args.slice(1).join(' ').split('').map(c => emojimap[c] || c).join('') );
        }
        if(command == "list"){
            let embed = new client.external.Discord.RichEmbed()
            .setAuthor(`Emojis do Servidor ( ${message.guild.name} )`)
            .setColor(`#602bff`)
            .setDescription(message.guild.emojis.map(a => a.name).join( ' **|** '))
            message.reply(embed)
        }
        if(command == "info"){
            let reason = args.slice(1).join(' ')
            if (!args.slice(1).join(' ')) return message.reply('**Diga um emoji para eu pegar informações!**')
            var em = message.guild.emojis.find('name',reason)
            if (!em) return message.reply('**Diga um emoji válido! Veja os emojis disponiveis no ``'+client.prefix+'emoji list``**')
            let embed = new client.external.Discord.RichEmbed()
            .setAuthor(`Informações do Emoji ( ${em.name} )`)
            .setDescription('\n:newspaper:  **ID:** ' + em.id + '\n:yum:  **Animado:** ' +  (em.animated ?'Sim':'Nao') + ' \n:date:  **Criado em:** ' + moment(em.createdAt).format('LL') + `\n:frame_photo:  **[Download do emoji](${em.url})**`)
            .setThumbnail(em.url)
            .setColor(`#602bff`)
            message.reply({embed})
    }
    }
})