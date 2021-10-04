module.exports.resume = function (msg, servers) {

    console.log('resume')
    servers.server.dispatcher.resume();
    msg.channel.send('Voltando a tocar! 💃 🕺')

};