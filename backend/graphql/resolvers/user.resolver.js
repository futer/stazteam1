const userService = require("../../services/user.service");
const jwt = require('jsonwebtoken');

function getUsers(root, args, context) {
    return userService.getAll();
}

async function updateUser(root, args, context) {
    let user;
    await userService.isAdmin(context.headers.authorization)
    .then(() => {
        user = userService.updateUser(args.user);
    })
    .catch(error => {throw error})
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