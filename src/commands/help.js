const { MessageEmbed } = require('discord.js');

const dataOptions = [

    {
        title:'>join',
        description: 'Faz com que eu entre no canal de voz de quem me chamou! 🤖 '
    },
    {
        title:'>leave',
        description: ' Faz com que eu pare minhas atividades e saia do canal de voz! 🏃🏾‍♂️💨'
    },
    {
        title:'>play <link>/ <texto para pesquisa>',
        description: 'Faz com que eu busque alguma musica a partir de um texto ou link do Youtube, eai bora escutar uma?  🎶 '
    },
    {
        title:'>pause',
        description: 'Pausar a música em um determinado ponto! ⏸ 🔈 '
    },
    {
        title:'>resume',
        description: 'Retornar a música de onde ela foi pausada! ⏯ 🔊 '
    },
    {
        title:'>reset',
        description: 'Esvazia a Playlist! 🗑'
    },
    {
        title:'>skip',
        description: 'Passa para a próxima música da Playlist! ⏩'
    },
]

module.exports.help = function (msg) {

    const embed = new MessageEmbed()
        .setColor([204, 36, 0])
        .setAuthor('Guia de comandos possíveis!')

    for(let i in dataOptions){

        embed.addField(
            `${dataOptions[i].title}`,
            dataOptions[i].description
        );

    }

    msg.channel.send(embed);

}

