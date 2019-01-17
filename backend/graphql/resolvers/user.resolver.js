const userService = require("../../services/user.service");

function getUsers(root, args, context) {
    return userService.getAll();
}

function updateUser(root, args, context) {
    const user = userService.updateUser(args);
    return user;
}

module.exports = {
    getUsers,
    updateUser,
}