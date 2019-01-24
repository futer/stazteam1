const userService = require("../../services/user.service");
const jwt = require('jsonwebtoken');

function getUsers(root, args, context) {
    return userService.getAll();
}

function updateUser(root, args, context) {
    const user = userService.updateUser(args);
    return user;
}

function getCurrentUser(root,args,context) {
    return userService.getById(jwt.decode(context.headers.authorization).sub._id);
}

module.exports = {
    getUsers,
    updateUser,
    getCurrentUser
}