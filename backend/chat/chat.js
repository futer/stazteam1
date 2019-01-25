const userService = require('../services/user.service');

const { banEnum, commandEnum, roleEnum } = require('./models/command.enum');

const loginCMDModel = require('./models/login.command.model');
const messageCMDModel = require('./models/message.command.model');
const banCMDModel = require('./models/ban.command.model');
const shortMessageCMDModel = require('./models/shortMessage.command.model');

let numberOfMessages = 0;

let wss;
let token;
let loggedUser;

function init(wsServer, tokenParam, lUser) {
  wss = wsServer;
  token = tokenParam;
  loggedUser = lUser;
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
    case commandEnum.MESSAGE:
      messageCommand(ws, message);
      break;
    case commandEnum.LOGIN:
      loginCommand(ws, message);
      break;
    case commandEnum.LOGOUT:
      logoutCommand(ws, message);
      break;
    case commandEnum.BAN:
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
  console.log(loggedUser.sub);
  userService.isBanned(loggedUser._id)
    .then((isBanned) => {
      console.log(isBanned);
      if (isBanned) {    
        const msg = shortMessageCMDModel('ERROR', 'your account is banned');
        ws.send(msg.getJSON());
        ws.terminate();
        return;
      }
      console.log('ok');
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
  userService.isModerator(token)
    .catch(err =>{
      const msg = shortMessageCMDModel('ERROR', err.name);
      ws.send(msg.getJSON());
      return;
    });


  const banModel = banCMDModel().castFrom(message);
  switch (banModel.payload.ban) {
    case banEnum.USER:
      const user = userService.banUser(message.payload.id);
      user.then(data => {
        sendToAll(banModel.getJSON());
      });  
      break;
    case banEnum.MESSAGE:
      sendToAll(banModel.getJSON());
    default:
      break;
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
