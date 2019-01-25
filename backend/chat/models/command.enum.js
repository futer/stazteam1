const commandEnum = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  MESSAGE: 'message',
  BAN: 'ban',
};

const banEnum = {
  USER: 'user',
  MESSAGE: 'message',
};

const statusEnum = {
  ERROR: 'error',
  SUCCESS: 'success',
};

const roleEnum = {
  ADMIN: 'admin',
  REVIEWER: 'reviewer',
  EDITOR: 'editor',
  MODERATOR: 'moderator',
  USER: 'user',
};

module.exports = {
  commandEnum,
  banEnum,
  statusEnum,
  roleEnum,
};
