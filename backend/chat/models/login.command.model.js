const { commandEnum } = require('./command.enum');

function loginCMDModel(idUser = null, firstName = null, lastName = null) {
  const obj = {
    command: commandEnum.LOGIN,
    payload: {
      user: {
        id: idUser,
        firstName: firstName,
        lastName: lastName,
      },
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
      this.payload.user.id = obj.payload.user.id;
      this.payload.user.firstName = obj.payload.user.firstName;
      this.payload.user.lastName = obj.payload.user.lastName;

      return this;
    }
  };

  return obj;
};

module.exports = loginCMDModel;
