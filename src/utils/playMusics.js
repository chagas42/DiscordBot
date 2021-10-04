const config = require('../../config.json');
const ytdl = require('ytdl-core');


module.exports.playMusics = function playMusics (servers) {
    if (servers.server.playing === false) {
        const playing = servers.server.queue[0];
        servers.server.playing = true;
        
        if(playing){
            servers.server.dispatcher = servers.server.connection.play(ytdl(playing, config.YTDL)); 
            console.log('tocando')
        }
        
        servers.server.dispatcher.on('finish', () => {
            servers.server.queue.shift();
            servers.server.playing = false;
    
            if(servers.server.queue.length > 0){
                playMusics(servers);
            } else {
                servers.server.dispatcher = null;
            }
        })
    }

}


