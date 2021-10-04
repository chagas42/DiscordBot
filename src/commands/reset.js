module.exports.reset = function ( msg, servers ) {

    servers.server.queue = [];
    msg.channel.send('Lista de Músicas esvaziada! 🗑');

};