const userService = require("../../services/user.service");
const jwt = require('jsonwebtoken');

function getUsers(root, args, context) {
    return userService.getAll();
}

async function updateUser(root, args, context) {
    let user;
    if (jwt.decode(context.headers.authorization).sub._id === args.user.id){
        if (args.user.password){        
            await userService.getById(args.user.id).then(user => {
                if (args.user.oldPassword === user.password){
                    user = userService.updateUser(args.user)
                        .catch(error => { throw error });
                } else { 
                    value = 'The old password you have entered is incorrect';
                    const err = new Error(value);
                    err.status = 500;
                    err.name = "Old password entered wrong";
                    throw err;
                }
            })
            
        }
        user = userService.updateUser(args.user).catch(error => {throw error});
    }
    else {
        await userService.isAdmin(context.headers.authorization)
        .then(() => {
            user = userService.updateUser(args.user);
        })
        .catch(error => {throw error})
    }

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