module.exports.leave = function (msg, servers) {
    console.warn('leave')
    servers.server.connection = null;
    servers.server.dispatcher = null;
    servers.server.playing = false;
    servers.server.queue = [];
    msg.member.voice.channel.leave() // fazendo com que o bot entre no canal de voz do membro que o chamou
}