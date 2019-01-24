module.exports = new (class cmd {
    constructor() {
        this.name = "invitestop";
        this.category = "moderation"
        this.help = "See someone avatar";
        this.cooldown = 5;
        this.cdMessage = "Wait 5 seconds to use this again";
        this.aliases = ["topinvites"]
    }
    run({ message, buildMessage, client, args }) {
        //if (!message.guild.members.get(client.user.id).hasPermission('ADMINISTRATOR') && !message.guild.members.get(client.user.id).hasPermission('MANAGE_GUILD')) return message.reply(language.invitersPerm)
        message.guild.fetchInvites().then(a => {
            var u = []
            for (var i = 0; i < a.size; i++) {
                if (a.array()[i].inviter) {
                    if (u.map(b => b.owner).indexOf(a.array()[i].inviter) == -1) {
                        var nome = '';
                        if (message.guild.members.get(a.array()[i].inviter.id)) {
                            nome = message.guild.members.get(a.array()[i].inviter.id).nickname ? message.guild.members.get(a.array()[i].inviter.id).nickname : a.array()[i].inviter.username
                        }
                        else nome = a.array()[i].inviter
                        u.push({
                            owner: a.array()[i].inviter,
                            nome: nome,
                            usos: a.array()[i].uses
                        })
                    } else {
                        u[u.map(b => b.owner).indexOf(a.array()[i].inviter)].usos += a.array()[i].uses
                    }
                }
            }
            var filtrado = u.sort(function (c, d) {
                return d.usos - c.usos
            })
            var numero = 0;
            filtrado.slice(0, 10).map(a => numero += a.usos)
            var txt = filtrado.slice(0, 8).map((c, d) => `[${(d + 1)}] - ${c.nome}\nTotal de pessoas convidadas: **${c.usos}**\n`)
            message.reply({
                embed: {
                    'author': 'Top promoters',
                    'description': `${txt.join('')}\n\n"Adding the invitations of these users to a total of:\n **${numero}**  Recruited Users!"`,
                    'color': 65535,
                    'footer': {
                        'icon_url': `${message.author.avatarURL}`,
                        'text': `${message.author.username}`
                    },
                    'thumbnail': {
                        'url': message.guild.iconURL
                    }
                }
            })

        })
    }
})