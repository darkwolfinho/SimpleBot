module.exports = new (class cmd {
    constructor() {
        this.name = "invites";
        this.category = "moderation"
        this.help = "See the amount of Invited Users";
        this.cooldown = 5;
        this.cdMessage = "Wait 5 seconds to use this again";
        this.aliases = ["convites"]
    }
    run({ message, buildMessage, client, args }) {
        if (!message.guild.members.get(client.user.id).hasPermission('ADMINISTRATOR') && !message.guild.members.get(client.user.id).hasPermission('MANAGE_GUILD')) return message.reply(language.invitersPerm);
        let mencionado = message.mentions.users.size > 0 ? message.mentions.users.first() : message.author;
        message.guild.fetchInvites().then(a =>{
            let filtrado = [];
            for (var i=0; i < a.size;i++){
                if (a.array()[i].inviter){
                    if (a.array()[i].inviter.id == mencionado.id){
                        filtrado.push(a.array()[i]);
                    } }
            }
            let txt = filtrado.map(b => `${b.url} **|** Pessoas convidadas: **${b.uses}**\n`);
            let total = 0;
            filtrado.map(b => total+= b.uses);
            if (txt == '' || txt == null || txt.length < 1) txt = "No invitation on this server";
            else txt = txt.join('');
            message.reply({embed:{
                'name':mencionado.username,
                'author': {
                    "name": `${mencionado.username} Invites:`,
                    "icon_url":mencionado.avatarURL
                },
                'description':`**${txt}\n\Server: **${message.guild.name}**\n\nTotal Uses: **${total}`,
                'color':message.member.displayColor || 65535,
                'thumbnail':{
                    'url':message.guild.iconURL
                }
            }});    
        });
    }
})