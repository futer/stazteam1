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
    console.log("ARGS", jwt.decode(context.headers.authorization.slice(7)).sub._id) ;
    return userService.getById(jwt.decode(context.headers.authorization.slice(7)).sub._id);
}

module.exports = {
    getUsers,
    updateUser,
    getCurrentUser
}