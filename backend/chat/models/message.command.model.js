const { commandEnum } = require('./command.enum');

function messageCMDModel(idUser = null, firstName = null, lastName = null, pic = null, message = null, idMessage = null) {
  const obj = {
    command: commandEnum.MESSAGE,
    payload: {
      user: {
        id: idUser,
        firstName: firstName,
        lastName: lastName,
        pic: pic,
      },
      message: {
        id: idMessage,
        message: message,
      },
    },

    getJSON: function() {
      const json = {
        command: this.command,
        payload: this.payload,
      };

      return JSON.stringify(json);
    },

    setId: function(id) {
      this.payload.message.id = id;
    },

    castFrom: function(obj) {
      this.command = obj.command;
      this.payload.user.id = obj.payload.user.id;
      this.payload.user.firstName = obj.payload.user.firstName;
      this.payload.user.lastName = obj.payload.user.lastName;
      this.payload.user.pic = obj.payload.user.pic;
      this.payload.message.id = obj.payload.message.id;
      this.payload.message.message = obj.payload.message.message;

      return this;
    },
  };
  
  return obj;
};

module.exports = messageCMDModel;
