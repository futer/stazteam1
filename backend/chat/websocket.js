const WebSocket = require('ws');
const chat = require('./chat');

function init(server) {
  const wss = new WebSocket.Server({ 
    server: server,
  });

  wss.on('connection', (ws, req) => {
    chat.init(wss);
    ws.isAlive = true;

    console.log('connection');

    ws.on('message', (message) => {
      chat.recvMessage(ws, message);
    }); 

    ws.on('close', () => {
      console.log('close');
    });

    ws.on('pong', () => {
      ws.isAlive = true;
    });
  });

  wss.on('ping', (ws) => {
    ws.pong();
  });

  setInterval(() => {
    wss.clients.forEach(client => {
      if (client.isAlive === false) {
        return client.terminate();
      }

      client.isAlive = false;
      client.ping();
    });
  }, 30000);
};

module.exports = {
  init,
};
