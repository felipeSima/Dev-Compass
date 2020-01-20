const socketio = require('socket.io');

exports.setupWebsocket = (server) => {
    const io = socketio(server)
};