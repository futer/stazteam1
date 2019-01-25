const WebSocket = require('ws');
const chat = require('./chat');
const env = require('../enviromental/enviroments');
const userService = require('../services/user.service');

function init(server) {
  const wss = new WebSocket.Server({ 
    server: server,
  });

  wss.on('connection', (ws, req) => {
    if (req.headers.origin !== env.CORS_ADDRESS) {
      ws.send(JSON.stringify({error: 'wrong origin!'}));
      ws.terminate();
      return;
    }
    let loggedUser = userService.isLogged(req.headers['sec-websocket-protocol']).sub;
    if (!loggedUser) {
      ws.send(JSON.stringify({error: 'you are not logged!'}));
      ws.terminate();
      return;
    }

    chat.init(wss, req.headers['sec-websocket-protocol'], loggedUser);
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
