module.exports.skip = function (servers) {

    if (servers.server.queue.length > 0) {

        if(servers.server.dispatcher) servers.server.dispatcher.end();
    }

};