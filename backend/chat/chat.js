const userService = require('../services/user.service');

const { banEnum } = require('./models/command.enum');

const loginCMDModel = require('./models/login.command.model');
const messageCMDModel = require('./models/message.command.model');
const banCMDModel = require('./models/ban.command.model');
const shortMessageCMDModel = require('./models/shortMessage.command.model');

let numberOfMessages = 0;

let wss;

function init(wsServer) {
  wss = wsServer;
};

function recvMessage(ws, message) {
  try {
    const parsedMessage = JSON.parse(message);
    handleCommand(ws, parsedMessage);
  } catch (err) {
    const msg = shortMessageCMDModel('ERROR', 'message has invalid format');
    sendMessage(ws, msg.getJSON());
  }
};

function handleCommand(ws, message) {
  const command = message.command;

  switch (command) {
    case 'message':
      messageCommand(ws, message);
      break;
    case 'login':
      loginCommand(ws, message);
      break;
    case 'logout':
      logoutCommand(ws, message);
      break;
    case 'ban':
      banCommand(ws, message);
      break;
    default:
      const msg = shortMessageCMDModel('ERROR', 'invalid command');
      sendMessage(ws, msg.getJSON());
      break;
  };
};

function messageCommand(ws, message) {
  const messageModel = messageCMDModel().castFrom(message);
  const banned = userService.isBanned(messageModel.payload.user.id);

  banned.then(isBanned => {
    if (isBanned) {
      const msg = shortMessageCMDModel('ERROR', 'your account is banned');
      ws.send(msg.getJSON());
      ws.terminate();
      return;
    }

    messageModel.setId(numberOfMessages);
    numberOfMessages++;
    sendToAll(messageModel.getJSON());
  });
};

function loginCommand(ws, message) {
  const loginModel = loginCMDModel().castFrom(message);
  const banned = userService.isBanned(loginModel.payload.user.id);
  banned.then((banned) => {
    if (banned) {
      const msg = shortMessageCMDModel('ERROR', 'your account is banned');
      ws.send(msg.getJSON());
      ws.terminate();
      return;
    }

    const msg = shortMessageCMDModel('SUCCESS', 'welcome!');
    sendToAllWithoutSender(ws, loginModel.getJSON());
    ws.send(msg.getJSON());
  });
};

function logoutCommand(ws, message) {
  const loginModel = loginCMDModel().castFrom(message);

  const msg = shortMessageCMDModel('SUCCESS', 'goodbye!');
  sendToAllWithoutSender(ws, loginModel.getJSON());

  ws.send(msg.getJSON());
};

function banCommand(ws, message) {
  const banModel = banCMDModel().castFrom(message);
  
  if (banModel.payload.ban === banEnum.USER) {
    const user = userService.banUser(message.payload.id);
    user.then(data => {
      sendToAll(banModel.getJSON());
    });  
  } else if (banModel.payload.ban === banEnum.MESSAGE) {
    sendToAll(banModel.getJSON());
  }
};

function sendMessage(ws, message) {
  ws.send(message);
};

function sendToAll(message) {
  wss.clients.forEach(client => {
    client.send(message);
  });
}; 

function sendToAllWithoutSender(ws, message) {
  wss.clients.forEach(client => {
    if (client !== ws) {
      client.send(message);
    }
  });
};

module.exports = {
    init,
    recvMessage,
    sendToAll,
    sendToAllWithoutSender,
};
