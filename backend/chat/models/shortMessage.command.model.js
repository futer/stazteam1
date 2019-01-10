const { commandEnum, statusEnum } = require('./command.enum');

function shortMessageCMDModel(status = null, message = null) {
  const obj = {
    command: commandEnum.MESSAGE,
    payload: {
      status: statusEnum[status],
      message: message,
    },
  
    getJSON: function() {
      const json = {
        command: this.command,
        payload: this.payload,
      };
  
      return JSON.stringify(json);
    },

    castFrom: function(obj) {
      this.command = obj.command;
      this.payload.status = this.payload.status;
      this.payload.message = obj.payload.message;

      return this;
    },
  };
  
  return obj;
};

module.exports = shortMessageCMDModel;
