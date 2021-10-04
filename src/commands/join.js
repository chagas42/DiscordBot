module.exports.join = async function (msg, servers) {
    console.log('join')
    try {
        servers.server.connection = await msg.member.voice.channel.join(); 
        // fazendo com que o bot entre no canal de voz do membro que o chamou
    } catch (err) {
        
        console.log('Erro ao entrar em um canal de voz!');
        console.log(err)

    }

}