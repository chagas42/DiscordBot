module.exports.pause = function (msg, servers) {


    if(servers.server.playing === false){
        msg.channel.send('Antes de pausar comece a tocar Algo!')
        return;
    }
    if(servers.server.dispatcher){

        servers.server.dispatcher.pause();
    }
}