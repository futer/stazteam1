const { commandEnum, banEnum } = require('./command.enum');

function banCMDModel(id, ban) {
  const obj = {
    command: commandEnum.BAN,
    payload: {
      id: id,
      ban: banEnum[ban],
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
      this.payload.id = obj.payload.id;
      this.payload.ban = obj.payload.ban;

      return this;
    },
  };
  
  return obj;
};

module.exports = banCMDModel;
