const WebSocket = require('ws');
const chat = require('./chat');
const env = require('../enviromental/enviroments');
const userService = require('../services/user.service');

function init(server) {
  const wss = new WebSocket.Server({ 
    server: server,
    perMessageDeflate: true,
    verifyClient(info, done) {
      if (info.origin !== env.CORS_ADDRESS) {
        done(
          false, 
          401, 
          'wrong origin!',
        );
      } 

      let loggedUser = userService.isLogged(info.req.headers['sec-websocket-protocol']);
      if (!loggedUser) {
        done(
          false,
          401,
          'You are not authorized',
        );
      }

      info.req.user = loggedUser.sub;
      info.req.token = info.req.headers['sec-websocket-protocol'];

      done(
        true, 
        200, 
        JSON.stringify({
          command: 'message', 
          payload: { 
            status: 'SUCCESS', 
            message: 'welcome!!!'
          }
        })
      );
    }
  });

  wss.on('connection', (ws, req) => {
    chat.init(wss, req);
    ws.isAlive = true;

    console.log('connection');

    ws.on('message', (message) => {
      chat.recvMessage(ws, message, req);
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
      if (!client.isAlive) {
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
