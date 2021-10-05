const ytdl = require('ytdl-core')
const { validateURL } = ytdl;
const { youtube_v3 } = require('googleapis');
const { MessageEmbed } = require('discord.js')

const { playMusics } = require('../utils/playMusics.js');

const youtube = new youtube_v3.Youtube({
    version:'v3',
    auth: process.env.GOOGLE_KEY
})


module.exports.play = async function (msg, servers) {
    let link = msg.content.slice(6);

        if (link.length === 0){
            msg.channel.send('Eu preciso de algo para tocar!');
            return;
        };

        if (servers.server.connection === null) { //join
            try {
                servers.server.connection = await msg.member.voice.channel.join(); // fazendo com que o bot entre no canal de voz do membro que o chamou
            } catch (err) {
                
                console.log('Erro ao entrar em um canal de voz!');
                console.log(err)
    
            }
        }

        if(validateURL(link)){// caso seja link

            servers.server.queue.push(link);
            playMusics(servers);

            console.log(`Adicionado: via link`);

        } else { //caso seja txt para pesquisa

           await youtube.search.list({
                q: link,
                part: 'snippet',
                fields: 'items(id(videoId), snippet(title, channelTitle))',
                type: 'video'
            }, async (err, result) => {
                if (err){
                    console.log(err)
                } else {

                    const listaResultados = [];
                    for(let i in result.data.items){
                        const montaItem = {
                            tituloVideo:result.data.items[i].snippet.title,
                            nomeCanal:result.data.items[i].snippet.channelTitle,
                            id:`https://www.youtube.com/watch?v=${result.data.items[i].id.videoId}`,
                        }

                        listaResultados.push(montaItem);
                    }

                    // constroi a messagem de Embed
                    const embed = new MessageEmbed()
                        .setColor([204,36,0])
                        .setAuthor('Mamba Bot')
                        .setDescription('Escolha sua música 1-5!');
                    
                    // adiciona campos para cada resultado da lista
                    for(let i in listaResultados){
                        embed.addField(
                            `${Number(i) + 1} - ${listaResultados[i].tituloVideo}`, 
                            listaResultados[i].nomeCanal
                        );
                    }

                    // mandando para o discord a msg de Embed
                    msg.channel.send(embed)
                        .then((embedMessage) => {
                            const reacts = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];

                            // reage na msg para cada emoji que escolhemos
                            for (let i in reacts){
                                embedMessage.react(reacts[i]);
                            };

                            const filter = (reaction, user) => {
                                return reacts.includes(reaction.emoji.name) 
                                    && user.id === msg.author.id; 
                            }

                            embedMessage.awaitReactions(filter, { max: 1, time: 20000, errors: ['time'] })
                                .then((collected) => {

                                    const reaction = collected.first();
                                    const idPickOption = reacts.indexOf(reaction.emoji.name);

                                    msg.channel.send(`Você escolheu ${listaResultados[idPickOption].tituloVideo} de ${listaResultados[idPickOption].nomeCanal}`)


                                    servers.server.queue.push(listaResultados[idPickOption].id);
                                    playMusics(servers);


                                }).catch((err) => {
                                    msg.reply('Você não escolheu uma opção válida!');
                                    console.log(err);
                                })
                        });
                }
            })  
           
        };

};